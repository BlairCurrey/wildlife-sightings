const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')

const UsersController = require('../controllers/users')

//Get user(s), Login, Signup, Update, and Delete
router.get('/', checkAuth, UsersController.getAll);
router.get('/:id', checkAuth, UsersController.getById);
router.post('/signup', UsersController.signup);
router.post('/login', UsersController.login);
router.delete('/:id', checkAuth, UsersController.delete);

module.exports = router;
