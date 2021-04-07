const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, lowercase: true, required: true, unique: true, immutable: true },
    first_name: { type: String, maxlength: 20 },
    last_name: { type: String, maxlength: 20 }
  });

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);
module.exports = User;