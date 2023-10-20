

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  userId: {
    type:Number,
    unique: true,
  },
  fullname: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {  
    type: String,
    trim: true, 
    private: true
  },
  passwordChangedAt: {
    type: Date,
    default: Date.now(),
    private:true
  },
  phoneno: {
    type:Number,
    trim: true,
    lowercase: true
  },
  gender: {
    type: String,
    trim: true,
    enum: ['male', 'female']
  },
  pic:{
    type:String,
    default:'/pic/default.webp'
  },
  referredby:{
    type:String,
    trim:true
  },
  district:{
    type:String
  },
  vidhan:{
    type:String
  },
  address:{
    type:String,
    trim:true
  },
  city:{
    type:String
  },
  state:{
    type:String,
    trim:true
  },
  pincode:{
    type:Number,
    required:true
  },
  createdBy:{
    type:Date
  },
  active:{
    type:Boolean,
    default:false
  }

}); 

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
 
const User = mongoose.model('User', userSchema);


module.exports = {
  User,
};
