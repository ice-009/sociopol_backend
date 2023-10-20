const express = require('express');
const router = express.Router();
const chatController = require('../controller/chat');
const { authToken } = require('../middlewares/auth');

router.post(
    '/create',
    authToken,
    chatController.sendChat
)
router.get(
    '/all',
    authToken,
    chatController.getAllChat
)
router.post(
    '/dpname',
    authToken,
    chatController.getDpNamebyUserid
)


module.exports = router;
