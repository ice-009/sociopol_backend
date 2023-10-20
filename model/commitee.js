const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const committeeSchema = mongoose.Schema({
  committeeId: {
    type:Number,
    unique: true,
  },
  name: {
    type: String
  },
  state:[{
    type:Number
  }],
  district:[{
    type:Number
  }],
  createdat:{
    type:Date
  }

})

 
const Committee = mongoose.model('Committee', committeeSchema);


module.exports = {
  Committee,
};
