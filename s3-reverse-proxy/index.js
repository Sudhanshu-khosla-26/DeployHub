const express = require('express');
const httpProxy = require('http-proxy');


const app = express();
const BASE_PATH = `https://s3.eu-north-1.amazonaws.com/vercel-clone-2.0/__outputs`
const PORT = 8000;
const proxy = httpProxy.createProxy();
let framework;

app.use(async (req, res) => {
    const hostname = req.hostname;
    const subdomain = hostname.split(".")[0];

    fetch("http://localhost:9000/getprojectid", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        body: JSON.stringify({ name: subdomain }),
    }).then((data) => {
        console.log(data);

        return data.json()
    }).then((result) => {
        console.log(result.data.framework, "result");
        framework = result.data.framework;
        const resolveto = `${BASE_PATH}/${result.data.projectId}`;

        // for angular projectname/browser/index.html

        return proxy.web(req, res, { target: resolveto, changeOrigin: true });
    })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({ error: 'Error fetching project id' })
        })
})

console.log(framework, "framework");

proxy.on('proxyReq', (proxyReq, req, res) => {
    const url = req.url;
    if (framework === 'angular.js') {
        proxyReq.path += `browser/index.html`;
    }
    else if (url === '/') {
        proxyReq.path += 'index.html';
    }

    return proxyReq;

})

app.listen(PORT, () => {
    console.log(`Reverse Proxy Running...${PORT}`);
})

