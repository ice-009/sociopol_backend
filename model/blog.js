

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const blogSchema = mongoose.Schema({
  blogId: {
    type:Number,
    unique: true,
  },
  title: {
    type: String
  },
  bannerurl:{
    type:String,
    trim:true
  },
  thumbnailurl:{
    type:String,
    trim:true
  },
  images:[{
    type:String,
    trim:true
  }],
  description:{
    type:String,
    trim:true
  },
  createat:{
    type:Date
  },
  date:{
    type:String
  },
  blogtype:{
    type: String,
    trim: true,
    enum: ['Upcoming Event', 'Recent Event', 'News and Update', 'Blog']
  }

}); 


 
const Blog = mongoose.model('Blog', blogSchema);


module.exports = {
  Blog,
};
