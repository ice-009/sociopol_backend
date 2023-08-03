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
  '/create/team',
  authToken,
  adminController.getTeam
)
router.post(
  '/create/team/state',
  authToken,
  adminController.createTeamState
)
router.post(
  '/create/team/district',
  authToken,
  adminController.createTeamDistrict
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
router.get( 
  '/user/all',
  authToken,
  adminController.getAllUser
)
router.get(
  '/banner/delete/:id',
  authToken,
  adminController.deleteBanner
)
router.get(
  '/literature/delete/:id',
  authToken,
  adminController.deleteLiterature
)
router.get(
  '/vlog/delete/:id',
  authToken,
  adminController.deleteVlog
)
router.get(
  '/blog/delete/:id',
  authToken,
  adminController.deleteBlog
)
router.get(
  '/blog/view/:id',
  authToken,
  adminController.getBlogById
)
router.get(
  '/blog/edit/:id',
  authToken,
  adminController.getEditBlogById
)

router.get(
  '/team/delete/:id',
  authToken,
  adminController.deleteTeam
)
// router.get(
//   '/user/delete/:id',
//   authToken,
//   adminController.deleteBlog
// )
router.get(
  '/user/delete/:id',
  authToken,
  adminController.deleteUser
)
router.get(
  '/user/approve/:id',
  authToken,
  adminController.toggleApprove
)

router.get( 
  '/team/state/all',
  authToken,
  adminController.getTeamStateList
)
router.get( 
  '/team/district/all',
  authToken,
  adminController.getTeamdistrictList
)



router.post(
  '/upload',
  authToken,
  adminController.uploadfile
)




module.exports = router;
