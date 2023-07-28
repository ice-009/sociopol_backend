

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const bannerSchema = mongoose.Schema({
  bannerId: {
    type:Number,
    unique: true,
  },
  url:{
    type:String,
    trim:true
  },

}); 


 
const Banner = mongoose.model('Banner', bannerSchema);


module.exports = {
  Banner,
};
