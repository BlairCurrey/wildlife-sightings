const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

const AnimalController = require('../controllers/animals')

// Get, create, update, delete animals
router.get('/', AnimalController.getAll);
router.get('/:id', AnimalController.getById);
router.post('/', checkAuth, checkAdmin, AnimalController.create);
router.put('/', checkAuth, checkAdmin, AnimalController.update);
router.delete('/:id', checkAuth, checkAdmin, AnimalController.delete);

module.exports = router;