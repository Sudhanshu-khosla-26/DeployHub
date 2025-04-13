const { exec } = require('child_process')
const path = require('path')
const fs = require('fs')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const mime = require('mime-types')
// const Redis = require('ioredis')
const { Kafka } = require('kafkajs')


// const publisher = new Redis('rediss://default:AVNS_icn3U0uU4ZTPOoU1kob@valkey-1e8ec864-sudhanshukhosla123-4997.c.aivencloud.com:20982')



const s3Client = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: '',
        secretAccessKey: ''
    }
})

const PROJECT_ID = process.env.PROJECT_ID
const DEPLOYMENT_ID = process.env.DEPLOYMENT_ID

const kafka = new Kafka({
    clientId: `docker-build-server-${PROJECT_ID}`,
    brokers: ['kafka-c07330e-work-cd02.l.aivencloud.com:13365'],
    ssl: {
        ca: [fs.readFileSync(path.join(__dirname, 'kafka.pem'), 'utf-8')],
    },
    sasl: {
        username: 'avnadmin',
        password: '',
        mechanism: 'plain'
    }
})

const producer = kafka.producer({})

async function publishLog(log) {
    // publisher.publish(`logs:${PROJECT_ID}`, JSON.stringify({ log }))
    await producer.send({
        topic: `container-logs`,
        messages: [
            { Key: 'log', value: JSON.stringify({ PROJECT_ID, DEPLOYMENT_ID, log }) }
        ]
    })
}

async function init() {
    await producer.connect()

    console.log('Executing script.js')
    await publishLog('Build Started...')
    const outDirPath = path.join(__dirname, 'output')


    const p = exec(`cd ${outDirPath} && npm install && npm run build`)

    p.stdout.on('data', async function (data) {
        console.log(data.toString())
        await publishLog(data.toString())
    })

    p.stdout.on('error', async function (data) {
        console.log('Error', data.toString())
        await publishLog(`error: ${data.toString()}`)
    })

    p.on('close', async function () {
        console.log('Build Complete')
        await publishLog(`Build Complete`)
        let distFolderPath;
        const AngularPath = path.join(__dirname, 'output', 'angular.json');

        if (fs.existsSync(AngularPath)) {
            const packageJsonPath = path.join(__dirname, 'output', 'package.json');
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
            distFolderPath = path.join(__dirname, 'output', 'dist', packageJson.name);
        } else {
            distFolderPath = path.join(__dirname, 'output', 'dist')
        }
        // distFolderPath = path.join(outDirPath, 'dist');
        const distFolderContents = fs.readdirSync(distFolderPath, { recursive: true })

        await publishLog(`Starting to upload`)
        for (const file of distFolderContents) {
            const filePath = path.join(distFolderPath, file)
            if (fs.lstatSync(filePath).isDirectory()) continue;

            console.log('uploading', filePath)
            await publishLog(`uploading ${file}`)

            const command = new PutObjectCommand({
                Bucket: 'vercel-clone-2.0',
                Key: `__outputs/${PROJECT_ID}/${file}`,
                Body: fs.createReadStream(filePath),
                ContentType: mime.lookup(filePath)
            })

            await s3Client.send(command)
            await publishLog(`uploaded ${file}`)
            console.log('uploaded', filePath)
        }

        await publishLog('Deployed Successfully...');
        console.log('Done...')
        process.exit(0);
    })
}

init()