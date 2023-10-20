const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const adminSchema = mongoose.Schema({
  userId: {
    type:Number,
    unique: true,
  },
  username: {
    type: String
  },
  password: {  
    type: String,
    trim: true, 
    private: true
  },
  admintype: {
    type: String,
    trim: true,
    default:'admin',
    enum: ['subadmin', 'admin']
  },
  pic:{
    type:String,
    default:'/pic/default.webp'
  },
  createdat:{
    type:Date
  }

}); 

// adminSchema.statics.isEmailTaken = async function (email, excludeUserId) {
//   const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
//   return !!user;
// };

adminSchema.statics.isUsernameTaken = async function (username, excludeUserId) {
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  return !!user;
};

adminSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

adminSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
 
const Admin = mongoose.model('Admin', adminSchema);


module.exports = {
  Admin,
};
