const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const BASE_PATH = `https://s3.eu-north-1.amazonaws.com/vercel-clone-2.0/__outputs`;
const PORT = process.env.PORT || 8000;
const proxy = httpProxy.createProxy();

// Health check endpoint for Render
app.get('/health', (req, res) => res.send('OK'));

app.use(async (req, res) => {
    const hostname = req.hostname;
    const subdomain = hostname.split(".")[0];
    console.log(`Incoming request for subdomain: ${subdomain}`);

    try {
        const response = await fetch("https://deployhub-7s0l.onrender.com/getprojectid", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: subdomain }),
        });

        const result = await response.json();
        const framework = result.data.framework;
        const resolveto = `${BASE_PATH}/${result.data.projectId}`;

        console.log(`Proxying to: ${resolveto}`);

        req.framework = framework;

        proxy.web(req, res, {
            target: resolveto,
            changeOrigin: true,
            secure: false, // okay for S3 HTTPS
        });

    } catch (err) {
        console.error('Error during fetch or proxy:', err);
        return res.status(500).json({ error: 'Failed to fetch project details' });
    }
});

proxy.on('proxyReq', (proxyReq, req, res) => {
    const url = req.url;

    if (req.framework === 'angular.js') {
        proxyReq.path += 'browser/index.html';
    } else if (url === '/') {
        proxyReq.path += 'index.html';
    }
});

app.listen(PORT, () => {
    console.log(`✅ Reverse Proxy running on port ${PORT}`);
});
