
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  species: {
    type: String,
    default: 'Desconocida'
  },
  birthDate: {
    type: Date,
    default: Date.now
  },
  imageUrl: {
    type: String
  },
  // Link to the user who owns this plant
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // This creates the relationship to the User model
    required: true
  }
}, { timestamps: true });

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;
