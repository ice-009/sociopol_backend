const express = require('express');
const router = express.Router();
const dataController = require('../controller/vlog')
// const {authToken} = require('../middlewares/auth')

router.get( 
    '/recentevent',
    dataController.getAllRecentEvent
)
router.get( 
    '/allvlog',
    dataController.getAllVlog
)
router.get( 
    '/newsandupdate',
    dataController.getAllNewsAndUpdate
)
router.get(
    '/getAllLiterature',
    dataController.getAllLiterature
)
router.get(
    '/upcomingall',
    dataController.getAllUpcomingEvent
)
router.get(
    '/allbanner',
    dataController.getAllBanner
)
router.get(
    '/team/state',
    dataController.getAllStateTeam
)
router.get(
    '/team/district',
    dataController.getAllDistrictTeam
)



module.exports = router;
