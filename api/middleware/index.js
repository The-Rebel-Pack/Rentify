const admin = require('../config/firebase-config');
const { createHttpError } = require('../utils/validation');

class Middleware {
    async decodeToken(req, res, next) {
        try {
            const token = req.headers && req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
            if (token) {
                console.log('Token ok');
                const decodeValue = await admin.auth().verifyIdToken(token);
                if (decodeValue) {
                    req.user = decodeValue;
                    return next();
                }
            }
            return next(createHttpError(400, 'Unauthorized'));
        } catch (err) {
            return next(createHttpError(400, err.message || err));
        }
    }
}

module.exports = new Middleware();
