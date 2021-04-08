const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    type: { type: String, lowercase: true, required: true, unique: true, immutable: true },
  });

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;