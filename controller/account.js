const db = require('../config/db');

module.exports.signUp = function (req, res) {
    try {
        db.query('SELECT * FROM package', (error, result) => {
            if (error) {
                return res.render('errors/500', {
                    error : error
                })
            }
            return res.render('sign-up', {
                packages: result,
                siteKey: res.siteKey,
                referral: req.params.referral
            })
        });
    } catch (error) {
        return res.render('errors/500', {
            error : error
        })
    }
}

module.exports.createAccount = function (req, res) {
    try {
        db.query('INSERT INTO * FROM transaction where status = 0 and txid_client is not null limit 20', (error, elements) => {
            if (error) {
                res.render('admin', { result: [] })
            }
            res.render('admin', { result: elements})
        });
        return res.redirect('/login')
    } catch (error) {
        req.flash('error', 'Internal system error');
        console.log(err);
        return res.redirect('back');
    }
}