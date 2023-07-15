const catchAsyn = require('../utils/catch_async')
const authService = require('../services/auth')
const sendToken = require('../utils/sendtoken')

const signup = catchAsyn(async(req,res)=>{
     try {
        const user = await authService.signup(req.body)
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




module.exports = {
    signup,
    login,
    reset
}