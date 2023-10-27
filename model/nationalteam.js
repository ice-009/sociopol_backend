const mongoose = require('mongoose');

const nationalTeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sequenceno: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  image: {
    type: String, // You can store the image URL here
    // required: true,
  },
});

const NationalTeam = mongoose.model('NationalTeam', nationalTeamSchema);

module.exports = NationalTeam;