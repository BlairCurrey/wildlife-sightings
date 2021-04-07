const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const { Sighting } = require('../database/schemas');

// All sightings
router.get('/', async (req, res) => {
    try {
        const sightingDoc = await Sighting
            .find({}, Sighting.displayFields())
            .custom();
        res.status(200);
        res.send({ count: sightingDoc.length, sightings: sightingDoc });
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send({ message: "No documents found", error: error });
    }
});

// Sighting by id
router.get('/:id', async (req, res) => {
    try {
        const doc = await Sighting
            .findById(req.params.id, Sighting.displayFields())
            .custom();
        if(doc == null){ throw "No document found"}
        res.status(200);
        res.send({ sighting: doc });
    } catch (error) {
        console.log(error);
        res.status(404);
        res.send({ message: "No document found", error: error });
    }
});

// Add sighting
router.post('/', checkAuth, async (req, res) => {
    try {
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
        res.status(201);
        res.send({ message: "Added sighting" });
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send({ message: "Did not add sighting", error: error });
    }
});

// Update sighting
router.put('/', checkAuth, async (req, res) => {
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
        res.send({ message: `Sighting updated.` });
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send({ message: "Did not update sighting", error: error });
    }
});

// Remove sighting
router.delete('/:id', async (req, res) => {
    try {
        let result = await Sighting.deleteOne({_id: req.params.id});
        if(result.deletedCount == 0){ throw "Nothing to delete"};
        res.status(200);
        res.send({ message: `Deleted document` });
    } catch (error) {
        console.log(error);
        res.status(500);
        res.send({ message: "Did not delete animal", error: error });
    }
});

module.exports = router;