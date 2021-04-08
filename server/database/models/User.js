const mongoose = require('mongoose');
const roles = require('../roles')

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
    password: { type: String, required: true},
    role: { 
      type: String, 
      required: true, 
      enum: Object.values(roles),
      default: roles.USER
    }
  });

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);
module.exports = User;