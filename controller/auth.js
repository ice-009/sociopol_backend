const catchAsyn = require('../utils/catch_async')
const authService = require('../services/auth')
const sendToken = require('../utils/sendtoken')
const path = require('path')
const crypto = require('crypto')

const signup = catchAsyn(async(req,res)=>{
     try {
       
       

       const dppath = await uploadfile(req)

        const user = await authService.signup(req.body,dppath)
        sendToken(user,201,res)
     } catch (error) {
        console.log(error.status + error.message)
     }
})

const login = catchAsyn(async(req,res)=>{
   try {
      const user = await authService.login(req.body,res)
      sendToken(user,201,res)
   } catch (error) {
      console.log(error.status + error.message)
   }
})


const reset = catchAsyn(async(req,res)=>{
   try {
      const user = await authService.resetpass(req.body,req)
      sendToken(user,201,res)
   } catch (error) {
      console.log(error.status + error.message)
   }
})









const uploadfile = async(req)=>{

   const { dp} = req.files;

   // If no dp submitted, exit
   // if (!dp) return res.sendStatus(400);

   const ext = path.extname(dp.name)
   console.log(ext)

   const name = randomByte(10)

   const svname = __dirname + '../../public/file/' +name +ext
   const svreturn = '/file/' +name +ext

   // Move the uploaded dp to our upload folder
   dp.mv(svname);

   console.log(svreturn)

   // res.status(201).json({
   //   success:true,
   //   url:name+ext
   // })

   return svreturn

}



const randomByte = (size)=>{
   return crypto.randomBytes(size).toString('hex');
 }
 



module.exports = {
    signup,
    login,
    reset
}