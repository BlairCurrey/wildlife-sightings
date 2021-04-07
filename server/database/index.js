const mongoose = require('mongoose');

url = process.env.DATABASE_URL;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

const database = mongoose.connect(url, options)
  .then(() => console.log('Connected to database.'))
  .catch(err => console.error('Error connecting to database:', err.message));

mongoose.Promise = global.Promise;
module.exports = database;