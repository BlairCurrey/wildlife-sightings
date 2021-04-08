const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkSightingOwner = require('../middleware/check-sighting-owner');

const SightingsController = require('../controllers/sightings')

// Read, create, update, delete routes
router.get('/', SightingsController.getAll);
router.get('/:id', SightingsController.getById);
router.post('/', checkAuth, SightingsController.create);
router.put('/', checkAuth, checkSightingOwner, SightingsController.update);
router.delete('/', checkAuth, checkSightingOwner, SightingsController.delete);

module.exports = router;