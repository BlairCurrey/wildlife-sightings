// Not yet implemented - always passes

async function checkOwner(req, res, next) {
    try{
        next();
    } catch (error) {
        console.log(error);
            res.status(401);
            return res.send({message: "Permission denied"});
    }
}

module.exports = checkOwner;