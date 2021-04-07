const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../database/schemas');

//Login
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        let _ = await newUser.save()
        res.status(201);
        res.send({ message: "User created" });
    } catch (error) {
        console.log(error);
        if (error.name === 'MongoError' && error.code === 11000){
            res.status(422);
            res.send({ message: "Duplicate", error: error})
        } else {
            res.status(500);
            res.send({ error: error });   
        }
    }
});

// Login
router.post('/login', async (req, res) => {
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
        res.status(200);
        res.send({message: 'Auth successful', token: token});
    } catch (error) {
        console.log(error);
        if(error == "Authorization failed"){
            res.status(401);
            res.send({error: error});
        } else {
            res.status(500);
            res.send({error: error});
        }
    }
});

// All users
router.get('/', async (req, res) => {
    try {
        const doc = await User.find();
        res.status(200);
        res.send({ users: doc });
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send({ message: "No documents found", error: error });
    }
});

// User by ID
router.get('/:id', async (req, res) => {
    try {
        const doc = await User.findById(req.params.id);
        res.status(200);
        res.send({ users: doc });
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send({ message: "No document found", error: error });
    }
});

// Remove user
router.delete('/:id', async (req, res) => {
    try {
        let result = await User.deleteOne({_id: req.params.id});
        if(result.deletedCount == 0){ throw "Nothing to delete"};
        res.status(200);
        res.send({ message: `Deleted user`});
    } catch (error) {
        console.log(error);
        res.send({ message: "Did not delete user", error: error });
    }
});

module.exports = router;
