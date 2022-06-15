const express = require('express')
const config = require('./config')
const fs = require('fs');
const https = require('https');
const cors = require('cors')
const postRouter = require('./routers/postRouter')

const options = {
    cert: fs.readFileSync('./sslcert/fullchain.pem'),
    key: fs.readFileSync('./sslcert/privkey.pem')
};

const app = express()
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json({ limit: "50mb" }))
app.use('/api/post', postRouter)
app.use(
    cors({
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    })
);
// app.all('*', function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

start = async ()=>{
    https.createServer(options, app).listen(8447);
    app.listen(config.PORT, ()=>{
        console.log('Сервер запущен на поррте '+ config.PORT)
    })
}

start()