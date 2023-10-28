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
  image: {
    type: String,
    required: true,
  },
  postname: {
    type: String, 
    required: true
},
});

const NationalTeam = mongoose.model('NationalTeam', nationalTeamSchema);

module.exports = NationalTeam;
