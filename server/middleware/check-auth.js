const jwt = require('jsonwebtoken')

function checkAuth(req, res, next) {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        console.log(error);
            res.status(401);
            return res.send({message: "Authorization failed"});
    }
}

module.exports = checkAuth;