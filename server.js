const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql = require('promise-mysql');
const path = require('path');

const config = require('./config');
const pool = mysql.createPool(config.pool);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname+'/public/app'));

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
    next();
});

app.use(morgan('dev'));
let authRouter = require('./app/routes/authenticate')(express,pool);
app.use('/authenticate',authRouter);
let apiRouter = require('./app/routes/api')(express,pool);

app.use('/api',apiRouter);

app.get('/',(req,res) =>{
    res.sendFile(__dirname + '/index.html');
});

let server = app.listen(config.port,() => {console.log(`Listening on port ${config.port}...`)});