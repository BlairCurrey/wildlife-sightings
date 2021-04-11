const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

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

const signupSanitizer = (req) => {
    req.body.username = validator.escape(req.body.username);
    req.body.email = validator.escape(req.body.email);
    req.body.password = validator.escape(req.body.password);
    return req
}

const signupValidator = async (req) => {
    const { username, email, password } = req.body;
    let errors = []
    // username
    if(username.length == 0){
        errors.push("Username wasn\'t given");
    }
    if(await User.findOne({username: username})){
        errors.push("Username already exists");
    }
    // email
    if(email.length == 0){
        errors.push("Email doesn't exist");
    }
    if(await User.findOne({email: email})){
        errors.push("Email already exists");
    }
    if(!validator.isEmail(email)){
        errors.push("Invalid email");
    }
    //password
    if(password.length < 6){
        errors.push("Password is too short");
    }
    return errors
}

exports.signup = async (req, res) => {
    try {
        // sanatize and validate
        req = signupSanitizer(req);
        const validationErrors = await signupValidator(req);
        if(validationErrors.length > 0) throw validationErrors;

        // hash password and save user
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        let _ = await newUser.save()

        // response
        res.status(201);
        return res.send({ message: "User created" });
    } catch (error) {
        console.log(error);
        res.status(500);
        return res.send({ message: "Signup request failed" });
    }
};

const loginSanitizer = (req) => {
    req.body.email = validator.escape(req.body.email);
    req.body.password = validator.escape(req.body.password);
    return req
}

const loginValidator = async (req) => {
    const { email, password } = req.body;
    const user = await User.findOne({email: email});
    let errors = []
    // email
    if(!user){
        errors.push("Email not found");
    }
    //password
    if(!(await bcrypt.compare(password, user.password))){
        errors.push("Password doesn't match");
    };
    return [user, errors];
}

exports.login = async (req, res) => {
    try {
        //sanatize and validate
        req = loginSanitizer(req);
        const [user, validationErrors] = await loginValidator(req);
        if(validationErrors.length > 0) throw validationErrors;
        
        // issue new jwt and store in http only cookie
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_KEY,
            {expiresIn: "1h"}
        );
        res.cookie('token', token, {httpOnly: true})
        
        // response
        res.status(200);
        return res.send({message: 'Auth successful', token: token});
    } catch (error) {
        console.log(error);
        if(error){
            res.status(401);
            return res.send({message: "Authorization failed"});
        } else {
            res.status(500);
            return res.send({message: "Internal Error"});
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
