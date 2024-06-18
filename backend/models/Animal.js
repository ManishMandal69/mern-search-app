const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  habitat: { type: String, required: true }
});

const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;
