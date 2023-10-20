

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const vlogSchema = mongoose.Schema({
  vlogId: {
    type:Number,
    unique: true,
  },
  title: {
    type: String
  },
  url:{
    type:String,
    trim:true
  },
  createat:{
    type:Date
  }

}); 


 
const Vlog = mongoose.model('Vlog', vlogSchema);


module.exports = {
  Vlog,
};
