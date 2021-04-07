const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const SightingsController = require('../controllers/sightings')

// Read, create, update, delete routes
router.get('/', SightingsController.getAll);
router.get('/:id', SightingsController.getById);
router.post('/', checkAuth, SightingsController.create);
router.put('/', checkAuth, SightingsController.update);
router.delete('/:id', checkAuth, SightingsController.delete);

module.exports = router;