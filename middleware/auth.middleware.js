const jwt = require('jsonwebtoken');
const AdherentModel = require('../models/adherent');

module.exports.checkAdherent = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodedToken) => {
            if (err) {
                res.locals.adherent = null;
                res.cookie('jwt', '', { maxAge: 1 });
                next();
            } else {
                let adherent = await AdherentModel.findById(decodedToken.id);
                res.locals.adherent = adherent;
                next()
            }
        })
    } else {
        res.locals.adherent = null;
        next();
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodedToken) => {
            if (err) {
                console.log(err);
            } else {
                console.log(decodedToken.id);
                next();
            }
        })
    } else {
        console.log('No token');
    }
}