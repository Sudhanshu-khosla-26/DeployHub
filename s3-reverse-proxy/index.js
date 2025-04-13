const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const PORT = process.env.PORT || 8000;

const BASE_S3_URL = 'https://s3.eu-north-1.amazonaws.com/vercel-clone-2.0/__outputs';
const BACKEND_API_URL = 'https://deployhub-7s0l.onrender.com/getprojectid';

const proxy = httpProxy.createProxy();

app.use(async (req, res) => {
    try {
        const hostname = req.hostname;
        const subdomain = hostname.split('.')[0];

        const response = await fetch(BACKEND_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: subdomain }),
        });

        const result = await response.json();

        if (!result?.data?.projectId) {
            return res.status(404).json({ error: 'Project not found' });
        }

        const framework = result.data.framework;
        const projectId = result.data.projectId;
        const target = `${BASE_S3_URL}/${projectId}`;

        // For Angular, proxy to index.html directly
        if (framework === 'angular.js') {
            return res.redirect(`${target}/browser/index.html`);
        }

        // For others, default index.html or asset
        return proxy.web(req, res, {
            target,
            changeOrigin: true,
            secure: true,
        });

    } catch (err) {
        console.error('[Proxy Error]', err);
        return res.status(500).json({ error: 'Proxy server error' });
    }
});

// Proxy Error Handling
proxy.on('error', (err, req, res) => {
    console.error('[Proxy Internal Error]', err);
    res.status(500).json({ error: 'Internal proxy error' });
});

app.listen(PORT, () => {
    console.log(`🚀 Reverse Proxy running on port ${PORT}`);
});
