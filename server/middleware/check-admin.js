const { User } = require('../database/models');

async function checkAdmin(req, res, next) {
    try{
        const user = await User.findById(
            req.userData.id, 
            {'_id': 0, 'role': 1}
        );
        if(user.role != "ADMIN") throw "Failed admin check"
        next();
    } catch (error) {
        console.log(error);
            res.status(401);
            return res.send({message: "Permission denied"});
    }
}

module.exports = checkAdmin;