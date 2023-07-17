const VlogModel = require('../model/vlog')
const BlogModel = require('../model/blog')
const LiteratureModel = require('../model/literature')
const { nullChecker } = require('../helper/null_checker')
const ApiError = require('../utils/api_error')
const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const sendToken = require('../utils/sendtoken')



const getAllVlog = async () => {
    return await VlogModel.Vlog.find();
}

const getAllBlog = async()=>{

    return await BlogModel.Blog.find();
}


const getAllLiterature = async()=>{
    return await LiteratureModel.Literature.find();
}

const getAllRecentEvent = async()=>{
    const recevent = await BlogModel.Blog.find();
    const arr = [];
    for (let index = 0; index < recevent.length; index++) {
        const element = recevent[index];
        if(element.blogtype=='Recent Event'){
            arr.push(element)
        }       
    }
    return arr;
}

const getAllNewsAndUpdate = async()=>{
    const recevent = await BlogModel.Blog.find();
    const arr = [];
    for (let index = 0; index < recevent.length; index++) {
        const element = recevent[index];
        if(element.blogtype=='News and Update'){
            arr.push(element)
        }       
    }
    return arr;
}


module.exports = {
    getAllVlog,
    getAllBlog,
    getAllLiterature,
    getAllRecentEvent,
    getAllNewsAndUpdate
}