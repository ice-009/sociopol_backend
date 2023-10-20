const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
  teamId: {
    type:Number,
    unique: true,
  },
  name: {
    type: String
  },
  image:{
    type:String
  },
  userId:{
    type:Number
  },
  type:{
    type: String,
    trim: true,
    enum: ['state', 'district', 'national']
  },
  district:{
    type:String
  },
  postname:{
    type:String
  },
  sequenceno:{
    type:Number
  },
  locationId:{
    type:Number 
  },
  createdat:{
    type:Date
  },

})

 
const Team = mongoose.model('Team', teamSchema);


module.exports = {
  Team,
};
