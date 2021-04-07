const mongoose = require('mongoose');

const sightingSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
    animal: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Animal',
      required: true
    },
    location: {
        latitude: { type: Number }, 
        longitude: { type: Number } 
    },
    date: { type: Date },
    comment: { type: String, maxlength: 500 },
  });

sightingSchema.set('timestamps', true);

// display fields - omits '__v'
// might be able to chain .select('user animal ...')
// in sightingSchema.query.custom instead
sightingSchema.statics.displayFields = function() {
  return 'user animal location date comment createdAt updatedAt'
};

// Returns sightings with animal and user joins sorted by create
// date (new to old) as regular json object.
// Usage: const doc = await.Sighting.find().custom()
sightingSchema.query.custom = function() {
  return this.populate('animal', 'type') // join animal
  .populate('user', 'username')          // join user
  .lean()
  .sort({createdAt: -1})
  .exec();
};

const Sighting = mongoose.model('Sighting', sightingSchema);

module.exports = Sighting;