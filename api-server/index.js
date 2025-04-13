require('dotenv').config();
const express = require('express');
const { generateSlug } = require('random-word-slugs')
const { ECSClient, RunTaskCommand } = require('@aws-sdk/client-ecs')
// const Redis = require('ioredis')
const { Server } = require('socket.io')
const cors = require("cors");
const { z } = require('zod')
const { Kafka } = require('kafkajs')
const { PrismaClient } = require('@prisma/client')
const { createClient } = require("@clickhouse/client");
const { v4: uuidv4 } = require('uuid')
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const { Octokit } = require('octokit')


const app = express();
const PORT = 9000;
const prisma = new PrismaClient({})

const kafka = new Kafka({
    clientId: 'api-server',
    brokers: [process.env.KAFKA_BROKER],
    ssl: {
        ca: [fs.readFileSync(path.join(__dirname, process.env.KAFKA_CA_PATH), 'utf-8')],
    },
    sasl: {
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
        mechanism: 'plain'
    }
});


// const subscriber = new Redis('rediss://default:AVNS_icn3U0uU4ZTPOoU1kob@valkey-1e8ec864-sudhanshukhosla123-4997.c.aivencloud.com:20982')
const io = new Server({ cors: '*' })

const client = createClient({
    host: `https://${process.env.CLICKHOUSE_USER}:${process.env.CLICKHOUSE_PASSWORD}@${process.env.CLICKHOUSE_HOST}`,
    database: "default",
    username: process.env.CLICKHOUSE_USER,
    password: process.env.CLICKHOUSE_PASSWORD
});


const consumer = kafka.consumer({
    groupId: 'api-server-logs-consumer',
})


// io.listen(9001, () => { console.log("Socket server 9001"); })

// io.on('connection', socket => {
//     socket.on('subscribe', channel => {
//         socket.join(channel)
//         socket.emit('message', `Joined ${channel}`)
//     })
// })

const ecsClient = new ECSClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});


const config = {
    CLUSTER: process.env.ECS_CLUSTER,
    TASK: process.env.ECS_TASK
};


app.use(cors({ origin: '*' }))
app.use(express.json());

app.post('/user', async (req, res) => {
    const { id, firstName, lastName, picture, email } = req.body;

    const existinguser = await prisma.user.findUnique({ where: { id: id } })

    if (existinguser) {
        return res.json({ status: 'success but user already exist', data: { user: existinguser } })
    }

    const user = await prisma.user.create({
        data: {
            id,
            firstName,
            lastName,
            email,
            picture,
        }
    })

    if (!user) {
        throw new Error("User not created")
    }

    return res.status(200).json({ data: { user } })

})

app.post("/auth/github/callback", async (req, res) => {
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "Authorization code is missing" });
    }

    try {
        // Exchange code for access token
        const tokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            { headers: { Accept: "application/json" } }
        );


        const accessToken = tokenResponse.data.access_token;
        if (!accessToken) {
            return res.status(400).json({ error: "Failed to obtain access token" });
        }

        const octokit = new Octokit({
            auth: accessToken
        })

        const userResponse = await octokit.request('GET /user/repos', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })

        // Fetch user data from GitHub
        const userDetail = await axios.get("https://api.github.com/user", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        const USER = {
            id: userDetail.data.id,
            name: userDetail.data.name,
            login: userDetail.data.login,
            email: userDetail.data.email,
            picture: userDetail.data.avatar_url,
            repos: userResponse.data,
        }

        res.json({
            accessToken,
            user: USER,
        });
    } catch (error) {
        console.error("GitHub Auth Error:", error);
        res.status(500).json({ error: "Authentication failed" });
    }
});

app.delete("/project/del", async (req, res) => {
    try {
        const { id } = req.body;

        console.log("Received ID:", id, "Type:", typeof id);

        if (!id || typeof id !== "string") {
            return res.status(400).json({ error: "Project ID is required and must be a string" });
        }

        // Delete all deployments linked to the project ID
        await prisma.deployment.deleteMany({
            where: { ProjectId: id }
        });

        // Check if the project exists before deletion
        const project = await prisma.project.findUnique({
            where: { id }
        });

        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        // Delete the project
        const deletedProject = await prisma.project.delete({
            where: { id }
        });

        return res.status(200).json({ deletedProject });
    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});


app.get("/getuser", async (req, res) => {
    const { id } = req.body;
    const user = await prisma.user.findUnique({ where: { id: id } })

    if (!user) {
        return res.status(404).json({ error: 'User not found' })
    }

    return res.status(200).json({ data: { user } })
})

app.get('/user/projects', async (req, res) => {
    const { id } = req.body;
    const projects = await prisma.project.findMany({
        where: {
            createdBy: id
        }
    })

    if (!projects) {
        return res.status(404).json({ error: 'Projects not found' })
    }

    if (projects.length === 0) {
        return res.status(404).json({ error: 'No projects found for this user' });
    }

    return res.status(200).json({ data: projects });
})

app.get('/logs/:id', async (req, res) => {
    const id = req.params.id;
    const logs = await client.query({
        query: `select event_id,deployment_id,log,is_completed , timestamp from log_events where deployment_id = {deployment_id: String}`,
        query_params: {
            deployment_id: id
        },
        format: 'JSONEachRow'
    })

    const rawLogs = await logs.json();

    // const statusQuery = await client.query({
    //     query: `select event_id,deployment_id,log, timestamp from log_events where deployment_id = {deployment_id: String}`,
    //     query_params: {
    //         deployment_id: id
    //     },
    //     format: 'JSONEachRow'
    // })

    //add status in clickhouse and kafka consumer 

    // const statusResult = await statusQuery.json();
    // const isComplete = statusResult.length > 0 && statusResult[0].status === 'completed';

    return res.status(200).json({ logs: rawLogs });
})


app.get('/deployments/:name', async (req, res) => {
    const name = req.params.name;
    const deployments = await prisma.deployment.findMany({ where: { project: { name: name } }, include: { project: true } })
    if (!deployments) {
        return res.status(404).json({ error: 'No deployments found' })
    }

    return res.status(200).json({ data: deployments })
})


app.post('/project', async (req, res) => {
    try {
        const schema = z.object({
            name: z.string(),
            gitURL: z.string(),
            createdBy: z.string(),
            framework: z.enum(['React.js', 'vue.js', 'angular.js', 'next.js', 'vanilla js']),
        })
        const safeParseResult = schema.safeParse(req.body)

        if (safeParseResult.error) return res.status(400).json({ error: safeParseResult.error })

        const { name, gitURL, createdBy, framework } = safeParseResult.data;
        const subDomain = "http://" + name + ".localhost:8000/";

        const existingProject = await prisma.project.findUnique({ where: { name: name } })

        if (existingProject) {
            return res.status(400).json({ type: "NameError", error: "Project Name already exists" })
        }

        const project = await prisma.project.create({
            data: {
                name: name,
                gitURL: gitURL,
                framework: framework,
                subDomain: subDomain,
                user: {
                    connect: { id: createdBy }
                },
            }
        })

        return res.json({
            status: "success", data: { project }
        })
    } catch (error) {
        console.log(error);
    }

})



app.post('/deploy', async (req, res) => {
    const { projectId } = req.body;
    // const { slug , gitUrl } = req.body;
    const project = await prisma.project.findUnique({ where: { id: projectId } });

    if (!project) return res.status(404).json({ error: 'Project not found' })

    // console.log(slug, "slug");
    // const projectSlug = slug ? slug : generateSlug();

    const deployment = await prisma.deployment.create({
        data: {
            project: { connect: { id: projectId } },
            status: 'QUEUED',
        }
    })


    const command = new RunTaskCommand({
        cluster: config.CLUSTER,
        taskDefinition: config.TASK,
        launchType: 'FARGATE',
        count: 1,
        networkConfiguration: {
            awsvpcConfiguration: {
                assignPublicIp: 'ENABLED',
                subnets: ['subnet-03c0f3acd82a51cd9', 'subnet-0cad6e3a92a7661a3', 'subnet-0af6c6d6fadd727e7'],
                securityGroups: ['sg-0b0c0bb960eb02737'],
            }
        },
        overrides: {
            containerOverrides: [
                {
                    name: 'builder-image',
                    environment: [
                        { name: 'GIT_REPOSITORY__URL', value: project.gitURL },
                        { name: 'PROJECT_ID', value: projectId },
                        { name: 'DEPLOYMENT_ID', value: deployment.id },
                    ]
                }
            ]
        },

    })

    const data = await ecsClient.send(command);

    console.log(data, "data");

    await prisma.deployment.update({
        where: {
            id: deployment.id
        },
        data: {

            status: 'IN_PROGRESS',
        }
    })



    // return res.json({ status: 'queued', data: { projectSlug, url: `http://${projectSlug}.localhost:8000` } })
    return res.json({ status: 'IN_PROGRESS', data: { deploymentId: deployment.id } })
})

app.post('/getprojectid', async (req, res) => {
    const { name } = req.body;

    const project = await prisma.project.findUnique({ where: { name: name } });

    if (!project) return res.status(404).json({ error: 'Project not found' })

    return res.status(200).json({ data: { projectId: project.id, framework: project.framework } })
})



app.get('/project/:name', async (req, res) => {
    const name = req.params.name;
    const project = await prisma.project.findUnique({ where: { name: name } });

    if (!project) return res.status(404).json({ error: 'Project not found' })

    return res.status(200).json({ data: { project } })
})





// async function initRedisSubscribe() {
//     console.log('Subscribed to logs....')
//     try {
//         subscriber.psubscribe('logs:*')
//         subscriber.on('pmessage', (pattern, channel, message) => {
//             io.to(channel).emit('message', message)
//         })
//     } catch (error) {
//         console.error("Redis subscription error:", error);
//     }
// }


// initRedisSubscribe()

async function initKafkaConsumer() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'container-logs' })


    await consumer.run({
        autoCommit: false,
        eachBatch: async function ({ batch, heartbeat, resolveOffset, commitOffsetsIfNecessary }) {
            const messages = batch.messages;

            console.log(`Recv. ${messages.length} messages..`);

            // const processMessages = async () => {
            for (const message of messages) {
                if (!message.value) continue;
                const srtingMessage = message.value.toString();
                const { PROJECT_ID, DEPLOYMENT_ID, log } = JSON.parse(srtingMessage);

                const is_completed = log === "Deployed Successfully..." ? 1 : 0;

                if (is_completed === 1) {
                    console.log("Completed", is_completed);
                    await prisma.deployment.update({
                        where: {
                            id: DEPLOYMENT_ID
                        },
                        data: {
                            status: 'READY'
                        }
                    })
                }

                try {
                    const { query_id } = await client.insert({
                        table: 'log_events',
                        values: [{ event_id: uuidv4(), deployment_id: DEPLOYMENT_ID, log, is_completed }],
                        format: 'JSONEachRow'
                    });
                    console.log(query_id, log);
                    resolveOffset(message.offset);
                    await commitOffsetsIfNecessary(message.offset);
                    await heartbeat();
                } catch (error) {
                    console.error("Error in processing message", error);
                }
            }
        }



    })

}

initKafkaConsumer();

// async function deleteall() {
//     // const p1 = await prisma.deployment.deleteMany({})
//     // const p2 = await prisma.project.deleteMany({})
//     // const p3 = await prisma.user.deleteMany({})

//     // console.log(p1, p2, p3);
//     const framwworkupdate = await prisma.project.update({ where: { name: 'kritika' }, data: { framework: 'vue.js' } })
//     console.log(framwworkupdate, "framework updated");

//     const edit = await prisma.user.update({
//         where: {
//             id: "145809308"
//         },
//         data: {
//             picture: "https://avatars.githubusercontent.com/u/145809308?v=4"
//         }
//     })

//     console.log(edit);
// }

// deleteall()



app.listen(PORT, () => {
    console.log(`API Server Running...${PORT}`);
})