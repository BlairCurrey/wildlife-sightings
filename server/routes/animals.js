const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const AnimalController = require('../controllers/animals')

// Get, create, update, delete animals
router.get('/', AnimalController.getAll);
router.get('/:id', AnimalController.getById);
router.post('/', AnimalController.create);
router.put('/', checkAuth, AnimalController.update);
router.delete('/:id', checkAuth, AnimalController.delete);

module.exports = router;