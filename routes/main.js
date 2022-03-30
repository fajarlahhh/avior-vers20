const express = require('express');
const router = express.Router();
const dotenv = require('dotenv')
var Recaptcha = require('express-recaptcha').RecaptchaV3
const account = require('../controller/account')
const request = require('request');

dotenv.config()

const siteKey = process.env.SITE_KEY
const secretKey = process.env.SECRET_KEY

var options = { hl: 'de' }
var recaptcha = new Recaptcha(siteKey, secretKey, options)

verifyCaptcha = function(req, res, next){
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

router.get('/signup/:referral', function (req, res, next) {
    res.siteKey = siteKey
    next()
}, account.signUp);
router.post('/signup', recaptcha.middleware.verify = verifyCaptcha, account.createAccount);

module.exports = router;