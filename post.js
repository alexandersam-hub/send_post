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

app.use(express.json({ limit: "50mb" }))
app.use('/api/post', postRouter)

app.use(
    cors({
        // credentials: true,
        // origin: ['http://127.0.0.1:5500/'],
        // optionsSuccessStatus: 200
    })
);

start = async ()=>{
    https.createServer(options, app).listen(8447);
    app.listen(config.PORT, ()=>{
        console.log('Сервер запущен на поррте '+ config.PORT)
    })
}

start()