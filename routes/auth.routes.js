const express = require('express');
const router = express.Router();
const authController = require('../controller/auth')
const adminController = require('../admin/controller/controller')
const {authToken} = require('../middlewares/auth')

router.post( 
    '/signup',
    authController.signup
)
router.post( 
  '/login',
  authController.login
)
router.post(
  '/password/rest',
  authToken,
  authController.reset
)

// router.post( 
//   '/login/adm',
//   adminController.login
// )

// router.post(
//   '/forgot-password',
//   authController.forgotPassword
// )

// router.get(
//   '/getprofile',
//   authToken,
//   authController.getProfile
// )
// router.post(
//   '/editprofile',
//   authToken,
//   authController.editProfile
// )
// router.post(
//   '/upload/dp',
//   authToken,
//   authController.uploadDp
// )
// router.get(
//   '/lookup',
//   authController.hostlookup
// )

// // router.post(
// //   '/reset-password',
// //   validator(authValidation.resetPassword),
// //   authController.resetPassword
// // );

module.exports = router;
