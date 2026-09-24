const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req,res)=> res.send('CinetPay Proxy Kinshasa OK'));
app.get('/ip', async (req,res)=>{
  try{
    const r = await axios.get('https://api.ipify.org?format=json');
    res.json({ip: r.data.ip, message: 'Donne cette IP a CinetPay'});
  }catch(e){ res.json({error:e.message}) }
});
app.post('/pay', async (req,res)=>{
  try{
    const r = await axios.post('https://api.cinetpay.com/v1/?method=getSignatureByPostData', req.body);
    res.json(r.data);
  }catch(e){ res.status(500).json({error:e.message}) }
});
app.post('/check', async (req,res)=>{
  try{
    const r = await axios.post('https://api.cinetpay.com/v1/?method=checkPayStatus', req.body);
    res.json(r.data);
  }catch(e){ res.status(500).json({error:e.message}) }
});
const PORT = process.env.PORT || 10000;
app.listen(PORT, ()=> console.log('Running'));
