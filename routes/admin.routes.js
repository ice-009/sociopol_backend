const express = require('express');
const router = express.Router();
const authController = require('../controller/auth')
// const multer = require('multer');
const path = require('path');
// const multer = require('multer');
// const upload = multer({ dest: '../images' });
const adminController = require('../admin/controller/controller')
const {authToken} = require('../middlewares/auth')
const NationalTeam = require('../model/nationalteam')
const TeamModel = require('../model/team')
// const bodyParser = require('body-parser');
// const uploadfile = require('../admin/controller/controller')
// const Upload = require('express-fileupload');
// async function generateU{niqueTeamId(type) 
  async function getLastTeamId() {
    try {
      const latestTeam = await TeamModel.Team.findOne().sort({ "teamId": -1 });
  
      if (latestTeam) {
        return latestTeam.teamId;
      }
  
      return 0; // Default if there are no existing teams
    } catch (error) {
      console.error(error);
      throw new Error('Error getting the last teamId');
    }
  }

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


 
router.post('/create/team/national',authToken, async (req,res)=>{
    try {
      
      const image = req.file
      console.log(image)
      const imagePath = 'images/' + image.filename;
      const nationalTeam = new NationalTeam({
        name: req.body.name,
        sequenceno: req.body.sequenceno,
        postname: req.body.postname,
        image: imagePath
        // Use the file data obtained from express-fileupload
      });
      
      // Save the national team to the database
      await nationalTeam.save();

      res.status(201).json({ message: 'National team created successfully' });
      // res.redirect('/team/national/all')
    } catch (error) {
     
      console.error(error);
      res.status(500).json({ message: 'Error creating national team' });
    } 
  })

  router.post('/create/team/state', authToken, async (req,res)=>{
    try {
      const lastTeamId = await getLastTeamId();
      const teamId = lastTeamId + 1;

      const image = req.file
      console.log(image)
      const imagePath = 'images/' + image.filename;
       await TeamModel.Team.create({
        teamId: teamId,
        name: req.body.name,
        type: req.type,
        image: imagePath,
        district: req.body.district,
        postname: req.body.postname,
        sequenceno: req.body.sequenceno,
        locationId: req.locationId,
    });
    return res.status(201).json({ message: 'State team created successfully' });

      // Save the national team to the database
      // await nationalTeam.save();

      // res.status(201).json({ message: ' team created successfully' });
      // // res.redirect('/team/national/all')
    } catch (error) {
     
      console.error(error);
      res.status(500).json({ message: 'Error creating state team' });
    } 
  })
  router.post('/create/team/district',authToken, async (req,res)=>{
    try {
      // const teambody = await TeamModel.Team.find().sort({ "teamId": -1 }).limit(1);
      const lastTeamId = await getLastTeamId();
      const teamId = lastTeamId + 1;

     
      const image = req.file
      console.log(image)
      const imagePath = 'images/' + image.filename;
       await TeamModel.Team.create({
        teamId: teamId,
        name: req.body.name,
        type: req.type,
        image: imagePath,
        district: req.body.district,
        postname: req.body.postname,
        sequenceno: req.body.sequenceno,
        locationId: req.locationId,
    });
    return res.status(201).json({ message: 'district team created successfully' });

      // Save the national team to the database
      // await nationalTeam.save();

      // res.status(201).json({ message: ' team created successfully' });
      // // res.redirect('/team/national/all')
    } catch (error) {
     
      console.error(error);
      res.status(500).json({ message: 'Error creating state team' });
    } 
  })

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
router.get('/team/national/all', authToken, async (req, res) => {
  try {
    // Fetch all national teams from your data source (e.g., database)
    const nationalTeams = await NationalTeam.find();

    // Render a view template with the national teams and any other data
    res.render('new/listnationalteam', { nationalTeams, user: req.user, pageTitle: 'National Teams' });
  } catch (error) {
    // Handle any errors or validation issues
    res.status(500).json({ error: 'An error occurred while fetching and rendering national teams.' });
  }
});



router.post(
  '/upload',
  authToken,
  adminController.uploadfile
)




module.exports = router;
