const express = require('express');
const router = express.Router();
const { User } = require('../database/schemas');

// All users
router.get('/', async (req, res) => {
    try {
        const doc = await User.find();
        res.status(200).send({
            users: doc
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            message: "No documents found",
            error: error
        });
    }
});

// User by ID
router.get('/:id', async (req, res) => {
    try {
        const doc = await User.findById(req.params.id);
        res.status(200).send({
            users: doc
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            message: "No document found",
            error: error
        });
    }
});

// Add user
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        newUser = new User({username: req.body.username});
        let _ = await newUser.save();
    } catch (error) {
        // Duplicate username
        if (error.name === 'MongoError' && error.code === 11000) {
            res.status(422).send({
                message: 'User already exists.',
                error: error
            });
          }
        console.log(error);
    }
});

// Remove user
router.delete('/:id', async (req, res) => {
    try {
        let result = await User.deleteOne({_id: req.params.id});
        if(result.deletedCount == 0){ throw "Nothing to delete"};
        res.status(200).send({
            message: `Deleted user`
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: "Did not delete user",
            error: error
        });
    }
});

module.exports = router;
