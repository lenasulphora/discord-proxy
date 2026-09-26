const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Discord Quest Proxy is Running!');
});

app.use('/discord', createProxyMiddleware({
  target: 'https://discord.com',
  changeOrigin: true,
  pathRewrite: {
    '^/discord': '',
  },
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
  }
}));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
