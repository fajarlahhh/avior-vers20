import express from "express"
import dotenv from "dotenv";
import { signUp, createAccount } from "../controller/auth.js"
import { RecaptchaV3 } from "express-recaptcha";
import request from "request";

const router = express.Router();

dotenv.config()

const siteKey = process.env.SITE_KEY
const secretKey = process.env.SECRET_KEY

var options = { hl: 'de' }
var recaptcha = new RecaptchaV3(siteKey, secretKey, options)

const verifyCaptcha = function(req, res, next){
    if(req.body === undefined || req.body === '' || req.body === null){
        return res.redirect('back');
    }
    
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body.captcha + "&remoteip=" + req.connection.remoteAddress;
  
    request(verificationURL,function(error, response, body) {
        body = JSON.parse(body);
        if(body.success !== undefined && !body.success) {
            return res.redirect('back');
        }
        next();
    });
}

router.get('/', (req, res) => {
    res.render('index')
});

router.get('/signup', function (req, res, next) {
    res.siteKey = siteKey
    next()
}, signUp);
router.post('/signup', recaptcha.middleware.verify = verifyCaptcha, createAccount);

export default router;