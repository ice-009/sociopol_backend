const express = require('express');
const router = express.Router();
const authController = require('../controller/auth')
const adminController = require('../admin/controller/controller')
const {authToken} = require('../middlewares/auth')


router.post( 
  '/login',
  adminController.login
)

router.post( 
  '/create/vlog',
  authToken,
  adminController.createVlog
)
router.get( 
  '/create/blog',
  authToken,
  adminController.getCreateBlog
)
router.post( 
  '/create/blog',
  authToken,
  adminController.createBlog
)

router.post(
  '/create/literature',
  authToken,
  adminController.createliterature
)
router.get(
  '/create/literature',
  authToken,
  adminController.getCreateLiterature
)
router.post(
  '/create/banner',
  authToken,
  adminController.createBanner
)
router.get(
  '/create/banner',
  authToken,
  adminController.getCreateBanner
)

router.get(
  '/create/vlog',
  authToken,
  adminController.getCreateVlog
)

router.get(
  '/login',
  adminController.getLogin
)

router.get( 
  '/vlog/all',
  authToken,
  adminController.getAllVlog
)
router.get( 
  '/banner/all',
  authToken,
  adminController.getAllBanner
)
router.get( 
  '/blog/all',
  authToken,
  adminController.getAllBlog
)
router.get( 
  '/literature/all',
  authToken,
  adminController.getAllLiterature
)

router.post(
  '/upload',
  authToken,
  adminController.uploadfile
)




module.exports = router;
