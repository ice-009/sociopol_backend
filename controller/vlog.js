const catchAsyn = require('../utils/catch_async')
const authService = require('../services/auth')
const sendToken = require('../utils/sendtoken')
const vlogService = require('../services/vlog')



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




module.exports = {
    getAllBlog,
    getAllLiterature,
    getAllRecentEvent,
    getAllVlog,
    getAllNewsAndUpdate
}