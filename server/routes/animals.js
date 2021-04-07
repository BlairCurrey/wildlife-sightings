const express = require('express');
const router = express.Router();
const { Animal } = require('../database/schemas');

// All animals
router.get('/', async (req, res) => {
    try {
        const doc = await Animal.find();
        res.status(200);
        res.send({ animals: doc });
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send({ message: "No documents found", error: error });
    }
});

// Animal by id
router.get('/:id', async (req, res) => {
    try {
        const doc = await Animal.findById(req.params.id);
        res.status(200);
        res.send({ animals: doc });
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send({ message: "No document found", error: error });
    }
});

// Add animal
router.post('/:type', async (req, res) => {
    try {
        newAnimal = new Animal({type: req.params.type});
        let _ = await newAnimal.save();
        res.status(201);
        res.send({ message: `Added ${req.params.type}` });
    } catch (error) {
        console.log(error);
        if (error.name === 'MongoError' && error.code === 11000) {
            res.status(422);
            res.send({message: 'Animal already exists.', error: error});
          }
        res.status(400);
        res.send({ message: "Did not add animal", error: error });
    }
});

// Remove animal
router.delete('/:id', async (req, res) => {
    try {

        let result = await Animal.deleteOne({_id: req.params.id});
        if(result.deletedCount == 0){ throw "Nothing to delete"};
        res.status(200);
        res.send({message: `Deleted document`});
    } catch (error) {
        console.log(error);
        res.send({ message: "Did not delete animal", error: error });
    }
});

module.exports = router;