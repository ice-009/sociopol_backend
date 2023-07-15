const express = require('express');
const router = express.Router();
const authController = require('../controller/auth')
const adminController = require('../admin/controller/controller')
const {authToken} = require('../middlewares/auth')


router.post( 
  '/login',
  adminController.login
);

router.post( 
  '/create/vlog',
  authToken,
  adminController.createVlog
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
  '/vlog/all',
  authToken,
  adminController.getAllVlog
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
