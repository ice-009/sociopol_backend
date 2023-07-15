
const catchAsyn = require('../../utils/catch_async')
const adminService = require('../service/service')
const vlogService = require('../service/vlog')
const AdminModel = require('../../model/admin')
const crypto = require('crypto')
const path = require('path')

const login = catchAsyn(async(req,res)=>{
     try {
     await adminService.login(req.body,res)
     } catch (error) {
        console.log(error)
     }
})


const createVlog = catchAsyn(async (req,res)=>{
    const admin = await AdminModel.Admin.findById(
      req.user.id
    );
    if(admin.userId!=1){
      return ;
    }

    const vlog = await vlogService.createVlog(req.body)

    res.status(201).json(
      vlog
    )
})

const getAllVlog = catchAsyn(async(req,res)=>{
    const allvlog = await vlogService.getAllVlog();
    res.status(200).json(allvlog)
})


const uploadfile = catchAsyn(async(req,res)=>{


    const { image } = req.files;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    const ext = path.extname(image.name)

    const name = randomByte(10)

    // Move the uploaded image to our upload folder
    image.mv(__dirname + '../../../upload/' +name +ext);

    res.status(201).json({
      success:true,
      url:name+ext
    });
})


const createBlog = catchAsyn(async(req,res)=>{
  const admin = await AdminModel.Admin.findById(
    req.user.id
  );
  if(admin.userId!=1){
    return ;
  }
  const blog =await vlogService.createBlog(req.body)
  res.status(201).json(
    blog
  )
})

const createliterature = catchAsyn(async(req,res)=>{
  const admin = await AdminModel.Admin.findById(
    req.user.id
  );
  if(admin.userId!=1){
    return ;
  }
  const literature =await vlogService.createLiterature(req.body)
  res.status(201).json(
    literature
  )
})

const getAllBlog = catchAsyn(async(req,res)=>{

  const allblog = await vlogService.getAllBlog();
  res.status(200).json(allblog)
})

const getAllLiterature = catchAsyn(async(req,res)=>{
  
  const allliterature = await vlogService.getAllLiterature();
  res.status(200).json(allliterature)
})



const randomByte = (size)=>{
  return crypto.randomBytes(size).toString('hex');
}



module.exports = {
    login,
    createVlog,
    getAllVlog,
    uploadfile,
    createBlog,
    createliterature,
    getAllBlog,
    getAllLiterature
}