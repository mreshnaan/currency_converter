require('dotenv').config();
const express = require('express');
const app = express();
//check if there is a port in env file or use default 3000
const port = process.env.PORT || 3000
//enable cors
const cors = require('cors');
//It parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json());
//use  routes
app.use('/api/v1/currency', require('./route/CurrencyConverterRoute'));

const perfix ='/api/v1/'
app.get(`${perfix}`,(req,res)=>{
    res.send('Hellow Surge');
})

app.listen(port,()=>console.log(`Server is online in http://localhost:${port}/api/v1/`));


