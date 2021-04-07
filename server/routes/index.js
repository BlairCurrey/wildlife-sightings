const express = require('express')
const path = require('path');

// import routes
const users = require('./users');
const animals = require('./animals');
const sightings = require('./sightings');

// instantiate router
const router = express.Router()

// pass router imported routes
router.use('/api/users', users);
router.use('/api/animals', animals);
router.use('/api/sightings', sightings);

router.get('/api', async (req, res) => {
    try{
        res.send({
            name: "Blair",
            age: 32,
        });
    } catch (error) {
        console.log(error)
    }
});

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
});

module.exports = router;