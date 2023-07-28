// const VlogModel = require('../model/vlog')
// const BlogModel = require('../model/blog')
// const BannerModel= require('../model/banner')
const ChatModel = require('../model/chat')
const UserModel = require('../model/user')
const LiteratureModel = require('../model/literature')
const { nullChecker } = require('../helper/null_checker')
const ApiError = require('../utils/api_error')
const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const sendToken = require('../utils/sendtoken')


const createChat = async(body,user)=>{
    console.log(user.id)
    const id = user.id
    const userId = await UserModel.User.findById(id)
    const chatBody = await ChatModel.Chat.find().sort({ "chatId": -1 }).limit(1);
    var chatId;
    if (chatBody.length == 0) {
        chatId = 1;
    } else {
        chatId = chatBody[0].chatId + 1;
    }
    console.log(body)
    return await ChatModel.Chat.create({
        chatId:chatId,
        msg:body.msg,
        userId:userId.userId,
        dp:userId.pic,
        name:userId.fullname,
        createat:body.time
    })
}


const getAllChat = async()=>{
     return await ChatModel.Chat.find();
}




module.exports = {
    createChat,
    getAllChat
}