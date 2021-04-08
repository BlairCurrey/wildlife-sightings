const { Sighting, User } = require('../database/models');
const roles = require('../database/roles');

async function checkSightingOwner(req, res, next) {
    try{
        const sighting = await Sighting.findById(
            req.body.id, 
            {'_id': 0, 'user': 1}
        );
        const user = await User.findById(
            req.userData.id, 
            {'_id': 0, 'role': 1}
        );
        if(sighting.user != req.userData.id && user.role != roles.ADMIN){
            throw "User does not own record and is not admin"
        }
        next();
    } catch (error) {
        console.log(error);
            res.status(401);
            return res.send({message: "Permission denied"});
    }
}

module.exports = checkSightingOwner;