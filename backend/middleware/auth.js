const jwt = require('jsonwebtoken');

const jwtGuard = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            console.log(err)
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = jwtGuard;