const express = require('express');
const router = express.Router();
const { Sighting, Animal } = require('../database/schemas');

// All sightings
router.get('/', async (req, res) => {
    try {
        const sightingDoc = await Sighting
            .find({}, Sighting.displayFields())
            .custom();
        res.status(200).send({
            count: sightingDoc.length,
            sightings: sightingDoc
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            message: "No documents found",
            error: error
        });
    }
});

// Sighting by id
router.get('/:id', async (req, res) => {
    try {
        const doc = await Sighting
            .findById(req.params.id, Sighting.displayFields())
            .custom();
        if(doc == null){ throw "No document found"}
        res.status(200).send({
            sighting: doc
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            message: "No document found",
        });
    }
});

// Add sighting
router.post('/', async (req, res) => {
    try {
        console.log(req.body);
        newSighting = new Sighting({
            user: req.body.userId,
            animal: req.body.animalId,
            location: {
                latitude: req.body.latitude, 
                longitude: req.body.longitude
            },
            date: req.body.date,
            comment: req.body.comment
        });
        let _ = await newSighting.save();
        res.status(201).send({
            message: "Added sighting"
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: "Did not add sighting",
            error: error
        });
    }
});

// Update sighting
router.put('/', async (req, res) => {
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
        if(result.nModified == 0){throw "Document submitted matches current record."}
        res.status(200).send({
            message: `Sighting updated.`
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: "Did not update sighting",
            error: error
        });
    }
});

// Remove sighting
router.delete('/:id', async (req, res) => {
    try {
        let result = await Sighting.deleteOne({_id: req.params.id});
        if(result.deletedCount == 0){ throw "Nothing to delete"};
        res.status(200).send({
            message: `Deleted document`
        });
    } catch (error) {
        console.log(error);
        res.send({
            message: "Did not delete animal",
            error: error
        });
    }
});

module.exports = router;