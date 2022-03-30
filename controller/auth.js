import Package from "../models/Package.js";


export const signUp = async function (req, res) {
    try {
        const packages = await Package.findAll();

        return res.render('sign-up', {
            packages: packages,
            siteKey: res.siteKey,
            referral: req.referral
        })
    } catch (error) {
        return res.render('errors/500', {
            error : error
        })
    }
}

export const createAccount = function (req, res) {
    
}
// module.exports.signUp = function (req, res) {
//     try {
//         // const packages = await Package.findAll();
        
//         return res.render('sign-up', {
//             packages: [packages],
//             siteKey: res.siteKey,
//             referral: req.referral
//         })
//     } catch (error) {
//         return res.render('errors/500', {
//             error : error
//         })
//     }
// }

// module.exports.createAccount = function (req, res) {
//     try {
//         db.query('INSERT INTO * FROM transaction where status = 0 and txid_client is not null limit 20', (error, elements) => {
//             if (error) {
//                 return res.render('sign-up-success', { result: 'Sign up failed' })
//             }
//             return res.render('sign-up-success', { result: 'Sign up success <a href="/login">Sign In Here</a>'})
//         });
//     } catch (error) {
//         req.flash('error', 'Internal system error');
//         console.log(err);
//         return res.redirect('back');
//     }
// }