const catchAsyn = require('../utils/catch_async')
const authService = require('../services/auth')
const sendToken = require('../utils/sendtoken')
const vlogService = require('../services/vlog')
const chatService = require('../services/chat')
const teamService = require('../admin/service/team')

const getAllBlog = catchAsyn(async (req, res) => {

    const allblog = await vlogService.getAllBlog();
    res.status(200).json(allblog)
})

const getAllVlog = catchAsyn(async (req, res) => {

    const allvlog = await vlogService.getAllVlog();
    res.status(200).json(allvlog)
})

const getAllLiterature = catchAsyn(async (req, res) => {

    const allliterature = await vlogService.getAllLiterature();
    res.status(200).json(allliterature)
})

const getAllRecentEvent = catchAsyn(async(req,res)=>{
    const allrecentEvent = await vlogService.getAllRecentEvent();
    res.status(200).json(allrecentEvent)
})

const getAllNewsAndUpdate = catchAsyn(async(req,res)=>{
    const allnews = await vlogService.getAllNewsAndUpdate();
    res.status(200).json(allnews)
})

const getAllUpcomingEvent = catchAsyn(async(req,res)=>{
    const allnews = await vlogService.getAllUpcomingEvent();
    res.status(200).json(allnews)
})

const getAllBanner = catchAsyn(async(req,res)=>{
    const allbanner = await vlogService.getAllBanner();
    res.status(200).json(allbanner)
})

// const createChat = catchAsyn(async(req,res)=>{
//     const chat = await chatService.createChat(req.body)
// })

const getAllStateTeam = catchAsyn(async(req,res)=>{
    const team = await teamService.getStateAllTeam()
    res.json(team)
})

const getAllDistrictTeam = catchAsyn(async(req,res)=>{
    const team = await teamService.getDistrictAllTeam(req)
    res.json(team)
})





module.exports = {
    getAllBlog,
    getAllLiterature,
    getAllRecentEvent,
    getAllVlog,
    getAllNewsAndUpdate,
    getAllBanner,
    getAllUpcomingEvent,
    getAllStateTeam,
    getAllDistrictTeam
    // createChat
}