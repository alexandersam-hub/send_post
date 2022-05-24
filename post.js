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
        origin:'*',
        credentials:true,            //access-control-allow-credentials:true
        optionSuccessStatus:200,
    })
);

start = async ()=>{
    https.createServer(options, app).listen(8447);
    app.listen(config.PORT, ()=>{
        console.log('Сервер запущен на поррте '+ config.PORT)
    })
}

start()