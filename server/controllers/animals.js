const { Animal } = require('../database/schemas');

exports.getAll = async (req, res) => {
    try {
        const doc = await Animal.find();
        res.status(200);
        res.send({ animals: doc });
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send({ message: "No documents found", error: error });
    }
};

exports.getById = async (req, res) => {
    try {
        const doc = await Animal.findById(req.params.id);
        res.status(200);
        res.send({ animals: doc });
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send({ message: "No document found", error: error });
    }
};

exports.create = async (req, res) => {
    try {
        newAnimal = new Animal({type: req.body.type});
        let _ = await newAnimal.save();
        res.status(201);
        res.send({ message: `Added ${req.body.type}` });
    } catch (error) {
        console.log(error);
        if (error.name === 'MongoError' && error.code === 11000) {
            res.status(422);
            res.send({message: 'Animal already exists.', error: error});
        } else {
            res.status(400);
            res.send({ message: "Did not add animal", error: error });
        }
    }
};

exports.update = async (req, res) => {
    try {
        query = {_id: req.body.id};
        updatedAnimal = {type: req.body.type};
        let _ = await Animal.updateOne(query, updatedAnimal);
        res.status(201);
        res.send({ message: `Updated to ${req.body.type}` });
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send({ message: "Did not update animal", error: error });
    }
};

exports.delete = async (req, res) => {
    try {

        let result = await Animal.deleteOne({_id: req.params.id});
        if(result.deletedCount == 0){ throw "Nothing to delete"};
        res.status(200);
        res.send({message: `Deleted document`});
    } catch (error) {
        console.log(error);
        res.send({ message: "Did not delete animal", error: error });
    }
};