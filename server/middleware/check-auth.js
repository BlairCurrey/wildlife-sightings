const jwt = require('jsonwebtoken')

function checkAuth(req, res, next) {
    try{
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        return next();
    } catch (error) {
        console.log(error);
            res.status(401);
            return res.send({message: "Authorization failed"});
    }
}

module.exports = checkAuth;