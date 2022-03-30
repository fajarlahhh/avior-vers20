import express from "express"
import dotenv from "dotenv"
import https from "https"
import http from "http"
import fs from "fs"
import bodyParser from "body-parser"
import cors from "cors"
import authRouter from "./routes/auth.js"

const corsOptions = {
    origin: "https://localhost:8080"
};

dotenv.config()

const app = express()

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

app.use(cors(corsOptions));
app.set('view engine', 'pug')
app.use(express.static('public'))
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.disable('etag')
app.disable('x-powered-by')

app.use('/', authRouter);

app.use((req, res, next) => {
    res.status(404).render('error')
})

httpServer.listen(portHttp);
httpsServer.listen(portHttps, '0.0.0.0');