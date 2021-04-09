const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../database/models');

exports.getAll = async (req, res) => {
    try {
        const doc = await User.find();
        res.status(200);
        return res.send({ users: doc });
    } catch (error) {
        console.log(error);
        res.status(404);
        return res.send({ message: "No documents found", error: error });
    }
};

exports.getById = async (req, res) => {
    try {
        const doc = await User.findById(req.params.id);
        res.status(200);
        res.send({ users: doc });
    } catch (error) {
        console.log(error);
        res.status(404);
        return res.send({ message: "No document found", error: error });
    }
};

exports.signup = async (req, res) => {
    try {
        // throw errors if email/username already exist
        let errors = {}
        if(await User.findOne({username: req.body.username})){
            errors.username = "Username already exists";
        }
        if(await User.findOne({email: req.body.email})){
            errors.email = "Email already exists";
        }
        if(Object.keys(errors).length !== 0) throw errors

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        let _ = await newUser.save()
        res.status(201);
        return res.send({ message: "User created" });
    } catch (error) {
        console.log(error);
        if (error.name === 'MongoError' && error.code === 11000){
            res.status(422);
            return res.send({ message: "Duplicate", error: error})
        } else {
            res.status(500);
            return res.send({ error: error });   
        }
    }
};

exports.login = async (req, res) => {
    try {
        // verify email exists
        const user = await User.findOne({email: req.body.email});
        if(!user) throw "Authorization failed";

        // compare passwords
        const pwMatch = await bcrypt.compare(req.body.password, user.password);
        if(!pwMatch) throw "Authorization failed";

        // success
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_KEY,
            {expiresIn: "1h"}
        );
        res.cookie('token', token, {httpOnly: true})
        res.status(200);
        return res.send({message: 'Auth successful', token: token});
    } catch (error) {
        console.log(error);
        if(error == "Authorization failed"){
            res.status(401);
            return res.send({error: error});
        } else {
            res.status(500);
            return res.send({error: error});
        }
    }
};

exports.update = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        let _ = await newUser.save()
        res.status(201);
        return res.send({ message: "User created" });
    } catch (error) {
        console.log(error);
        if (error.name === 'MongoError' && error.code === 11000){
            res.status(422);
            return res.send({ message: "Duplicate", error: error})
        } else {
            res.status(500);
            return res.send({ error: error });   
        }
    }
};

exports.delete = async (req, res) => {
    try {
        let result = await User.deleteOne({_id: req.params.id});
        if(result.deletedCount == 0){ throw "Nothing to delete"};
        res.status(200);
        return res.send({ message: `Deleted user`});
    } catch (error) {
        console.log(error);
        return res.send({ message: "Did not delete user", error: error });
    }
};
