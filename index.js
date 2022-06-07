const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const api = require('./routes/api')


const app = express();

app.use(bodyParser.json());
app.use('/', api);


app.get('*', (req, res)=>{
    res.sendStatus(404);
})

app.listen(8080, (req, res)=>{
    console.log("Server is running at port 8080 !!!");
})

