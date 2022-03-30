const express = require('express')
const dotenv = require('dotenv')
const https = require('https')
const http = require('http')
const fs = require('fs')
const bodyParser = require('body-parser')
const main = require('./routes/main');

dotenv.config()

const app = express()
const router = express.Router()

const portHttps = process.env.APP_PORT_HTTPS
const portHttp = process.env.APP_PORT_HTTP

let options = {
    cert : fs.readFileSync('./certificate/vers20_com.crt'),
    key : fs.readFileSync('./certificate/vers20_com.key')
};

const httpsServer = https.createServer(options, app);
const httpServer = http.createServer(app);

app.use((req, res, next) => {
    if(req.protocol === 'http') {
      res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
});
app.set('view engine', 'pug')
app.use(express.static('public'))
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.disable('etag')
app.disable('x-powered-by')

app.use('/', main);

app.use((req, res, next) => {
  res.status(404).render('errors/404')
})

httpServer.listen(portHttp);
httpsServer.listen(portHttps, '0.0.0.0');