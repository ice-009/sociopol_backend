const catchAsync = require("../utils/catch_async");
const chatService = require('../services/chat')
const authService = require('../services/auth')

const sendChat = catchAsync(async(req,res)=>{
   const chat = await chatService.createChat(req.body,req.user)
   res.status(201).json(chat)
})


const getAllChat = catchAsync(async(req,res)=>{
    const chats = await chatService.getAllChat();
    res.status(200).json(
        chats
    )
})

const getDpNamebyUserid = catchAsync(async(req,res)=>{
     const dpname = await authService.getDpName(req.body.id)
     res.status(200).json(dpname)
})


module.exports = {
    sendChat,
    getAllChat,
    getDpNamebyUserid
}