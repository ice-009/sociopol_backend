

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const literatureSchema = mongoose.Schema({
  literatureId: {
    type:Number,
    unique: true,
  },
  title: {
    type: String
  },
  fileurl:{
    type:String,
    trim:true
  },
  createat:{
    type:Date
  }

}); 


const Literature = mongoose.model('Literature', literatureSchema);


module.exports = {
  Literature,
};
