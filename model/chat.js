const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const chatSchema = mongoose.Schema({
  chatId: {
    type:Number,
    unique: true,
  },
  msg: {
    type: String
  },
  userId:{
    type:String,
    trim:true
  },
  createat:{
    type:String
  },
  dp:{
    type:String
  },
  name:{
    type:String
  }
  
}); 


 
const Chat = mongoose.model('Chat', chatSchema);


module.exports = {
  Chat,
};
