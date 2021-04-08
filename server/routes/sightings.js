const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkOwner = require('../middleware/check-admin');

const SightingsController = require('../controllers/sightings')

// Read, create, update, delete routes
router.get('/', SightingsController.getAll);
router.get('/:id', SightingsController.getById);
router.post('/', checkAuth, SightingsController.create);
router.put('/', checkAuth, checkOwner, SightingsController.update);
router.delete('/:id', checkAuth, checkOwner, SightingsController.delete);

module.exports = router;