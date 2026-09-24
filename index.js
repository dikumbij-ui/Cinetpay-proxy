const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req,res)=>res.send('CinetPay Proxy LIVE - OK'));
app.get('/ip', (req,res)=>res.json({ip:"44.226.122.3",proxy_url:"https://cinetpay-proxy-b1h3.onrender.com",status:"Donne cette IP a CinetPay"}));
app.post('/v1/payment', async (req,res)=>{
 try{
  const r=await fetch('https://api.cinetpay.com/v1/payment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(req.body)});
  const d=await r.json(); res.json(d);
 }catch(e){res.status(500).json({error:e.message})}
});
app.listen(process.env.PORT||10000,()=>console.log('Live'));
