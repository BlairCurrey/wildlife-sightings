const { Sighting } = require('../database/models');
const { Animal } = require('../database/models');
const validator = require('validator');

exports.getAll = async (req, res) => {
    try {
        const doc = await Sighting
            .find({}, Sighting.displayFields())
            .custom();
        res.status(200);
        return res.send({ count: doc.length, sightings: doc });
    } catch (error) {
        console.log(error);
        res.status(404);
        return res.send({ message: "No documents found", error: error });
    }
};

exports.getById = async (req, res) => {
    try {
        const doc = await Sighting
            .findById(req.params.id, Sighting.displayFields())
            .custom();
        if(doc == null){ throw "No document found"}
        res.status(200);
        return res.send({ sighting: doc });
    } catch (error) {
        console.log(error);
        res.status(404);
        return res.send({ message: "No document found", error: error });
    }
};

const createSanitizer = (req) => {
    Object.keys(req.body).forEach(key =>{
        req.body[key] = validator.escape(req.body[key]);
    })
    return req
}

const createValidator = async (req) => {
    const { animalId, latitude, longitude, date, comment } = req.body;
    let errors = []
    // animalId
    if(animalId.length == 0) errors.push("No animal given.")
    if(!(await Animal.findOne({_id: animalId}))){
        errors.push("Given animal id does not exist");
    }
    // latitude
    if(latitude.length == 0) errors.push("No latitude given.")
    if(!(validator.isFloat(latitude, {min: -90, max: 90}))){
        errors.push("Invalid latitude");
    }
    //longitude
    if(longitude.length == 0) errors.push("No longitude given.")
    if(!(validator.isFloat(longitude, {min: -180, max: 180}))){
        errors.push("Invalid longitude");
    }
    //date
    if(date.length == 0) errors.push("No date given.");
    if(!(validator.isDate(date))){
        errors.push("Invalid date");
    }
    //comment
    if(comment.length > 500) errors.push("Comment exceeds length limits");
    return errors
}

exports.create = async (req, res) => {
    try {
        // sanatize and validate
        req = createSanitizer(req);
        const validationErrors = await createValidator(req);
        if(validationErrors.length > 0) throw validationErrors;

        //add sighting
        newSighting = new Sighting({
            user: req.userData.id,
            animal: req.body.animalId,
            location: {
                latitude: req.body.latitude, 
                longitude: req.body.longitude
            },
            date: req.body.date,
            comment: req.body.comment
        });
        let _ = await newSighting.save();

        //response
        res.status(201);
        return res.send({ message: "Added sighting" });
    } catch (error) {
        console.log(error);
        res.status(500);
        return res.send({ message: "Did not add sighting", error: error });
    }
};

exports.update = async (req, res) => {
    try {
        query = {_id: req.body.id};
        updatedSighting = {
            animal: req.body.animalId,
            location: {
                latitude: req.body.latitude, 
                longitude: req.body.longitude
            },
            date: req.body.date,
            comment: req.body.comment
        };
        let result = await Sighting.updateOne(query, updatedSighting);
        if(result.nModified == 0) throw "Document submitted matches current record.";
        res.status(200);
        return res.send({ message: `Sighting updated.` });
    } catch (error) {
        console.log(error);
        res.status(500);
        return res.send({ message: "Did not update sighting", error: error });
    }
};

exports.delete = async (req, res) => {
    try {
        let result = await Sighting.deleteOne({_id: req.body.id});
        if(result.deletedCount == 0){ throw "Nothing to delete"};
        res.status(200);
        return res.send({ message: `Deleted document` });
    } catch (error) {
        console.log(error);
        res.status(500);
        return res.send({ message: "Did not delete animal", error: error });
    }
};