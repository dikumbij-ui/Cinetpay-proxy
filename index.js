const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const TARGET = 'https://api.cinetpay.net';

app.all('/v1/*', async (req, res) => {
  try {
    const url = TARGET + req.originalUrl;
    console.log('Proxy vers:', url);
    const response = await fetch(url, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: req.method !== 'GET' && req.body && Object.keys(req.body).length ? JSON.stringify(req.body) : undefined
    });
    const text = await response.text();
    res.status(response.status);
    try { res.json(JSON.parse(text)); } 
    catch { res.send(text); }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/', (req, res) => res.json({ status: 'proxy OK', target: TARGET }));
app.get('/ip', (req, res) => res.json({ ip: '44.226.122.3', proxy_url: 'https://cinetpay-proxy-blh3.onrender.com' }));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log('Live on', PORT));
