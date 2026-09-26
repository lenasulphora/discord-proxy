const express = require('express');
const serverless = require('serverless-http');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

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

module.exports.handler = serverless(app);
