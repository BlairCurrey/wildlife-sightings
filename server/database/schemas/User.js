const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
      immutable: true
    },
    email: { 
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true}
  });

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);
module.exports = User;