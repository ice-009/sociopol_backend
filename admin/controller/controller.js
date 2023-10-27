
const catchAsyn = require('../../utils/catch_async')
const adminService = require('../service/service') 
const vlogService = require('../service/vlog')
const AdminModel = require('../../model/admin')
const crypto = require('crypto')
const path = require('path')
const listconst = require('../data/district')
const teamService = require('../service/team')


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

    // res.status(201).json(           ___________________________DONOT REMOVE USE FOR API___
    //   vlog
    // )
    res.redirect('/api/v1/admin/vlog/all')
})

const getAllVlog = catchAsyn(async(req,res)=>{
    const allvlog = await vlogService.getAllVlog();
    // res.status(200).json(allvlog)              ___________________________DONOT REMOVE USE FOR API___
    res.render('new/listvlog',{"vlog":allvlog})
})


const uploadfile = async(req)=>{

    const { image} = req.files;

    // If no image submitted, exit
    // if (!image) return res.sendStatus(400);

    const ext = path.extname(image.name)

    const name = randomByte(10)

    const svname = __dirname + '../../../public/file/' +name +ext
    const svreturn = '/file/' +name +ext

    // Move the uploaded image to our upload folder
    image.mv(svname);

    // res.status(201).json({
    //   success:true,
    //   url:name+ext
    // })

    return svreturn

}

const uploadfilethumb = async(req)=>{


  const {thumbnail} = req.files;

  const ext = path.extname(thumbnail.name)

  const name = randomByte(10)

  const svname = __dirname + '../../../public/file/' +name +ext
  const svreturn = '/file/' +name +ext

  // Move the uploadedthumbnail to our upload folder
  thumbnail.mv(svname);

  // res.status(201).json({
  //   success:true,
  //   url:name+ext
  // })

  return svreturn

}

const uploadfileBanner = async(req)=>{


  const {banner} = req.files;


  const ext = path.extname(banner.name)

  const name = randomByte(10)

  const svname = __dirname + '../../../public/file/' +name +ext
  const svreturn = '/file/' +name +ext

  // Move the uploadedbanner to our upload folder
  banner.mv(svname);

  return svreturn

}



const uploadfileBlog = async(req)=>{


  const { image} = req.files;

  const list = [];

  for(let i = 0 ; i < image.length; i++){

    const ext = path.extname(image[i].name)

    const name = randomByte(10)
  
    const svname = __dirname + '../../../public/file/' +name +ext
    const svreturn = '/file/' +name +ext
  

    image[i].mv(svname)
    list.push(svreturn)
}

  return list

}





const createBlog = catchAsyn(async(req,res)=>{
  console.log(req.body)

  const admin = await AdminModel.Admin.findById(
    req.user.id
  );
  if(admin.userId!=1){
    return ;
  }
  const imglist = await uploadfileBlog(req)
  console.log(imglist)
  const thumnailpath = await uploadfilethumb(req)
  console.log(thumnailpath)
  const bannerpath = await uploadfileBanner(req)
  console.log(bannerpath)

  const blog =await vlogService.createBlog(req.body,imglist,thumnailpath,bannerpath)
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

 const pathname = await uploadfile(req)


  const literature =await vlogService.createLiterature(req.body,pathname)
  res.status(201).json(
    literature
  )
})

const createBanner=catchAsyn(async(req,res)=>{
  const admin = await AdminModel.Admin.findById(
    req.user.id
  );
  if(admin.userId!=1){
    return ;
  }

  const pathname = await uploadfile(req)
  console.log(pathname)
  const banner = vlogService.createBanner(req.body,pathname)
  // res.status(201).json(                    __________________________________API
  //   banner
  // )
  res.redirect('/api/v1/admin/banner/all')
})

const getCreateBanner = (async(req,res)=>{
  const admin = await AdminModel.Admin.findById(
    req.user.id
  );
  if(admin.userId!=1){
    return ;
  }

  const allBanner = await vlogService.getAllBanner();

  res.render('new/crbanner')
})



const getAllBlog = catchAsyn(async(req,res)=>{

  const allblog = await vlogService.getAllBlog();
  // res.status(200).json(allblog)     ___________________________DONOT REMOVE USE FOR API___
  res.render('new/listblog',{"blog":allblog})
})

const deleteBanner = catchAsyn(async(req,res)=>{
   await vlogService.deleteBanner(req.params.id)
   res.redirect('/api/v1/admin/banner/all')
})

const deleteVlog = catchAsyn(async(req,res)=>{
  await vlogService.deleteVlog(req.params.id)
  res.redirect('/api/v1/admin/vlog/all')
})
const deleteBlog = catchAsyn(async(req,res)=>{
  await vlogService.deleteBlog(req.params.id)
  res.redirect('/api/v1/admin/blog/all')
})



const getAllLiterature = catchAsyn(async(req,res)=>{
  
  const allliterature = await vlogService.getAllLiterature();
  // res.status(200).json(allliterature)     ___________________________DONOT REMOVE USE FOR API___
  res.render('new/listliterature',{"literature":allliterature})
})


const deleteLiterature = catchAsyn(async(req,res)=>{
  await vlogService.deleteLiterature(req.params.id)
  res.redirect('/api/v1/admin/literature/all')
})


const getAllBanner = catchAsyn(async(req,res)=>{
  
  const allBanner = await vlogService.getAllBanner();
  // res.status(200).json(allBanner)         ___________________________DONOT REMOVE USE FOR API___
  res.render('new/listbanner',{"banner":allBanner})
})


const getCreateVlog = catchAsyn(async(req,res)=>{
      res.render('new/crvlog')
})

const getCreateLiterature = catchAsyn(async(req,res)=>{
  res.render('new/crliterature')
})

const getCreateBlog = catchAsyn(async(req,res)=>{
  res.render('new/home')
})

const getBlogById = catchAsyn(async(req,res)=>{
    const blog = await vlogService.getBlogById(req.params.id)
    res.render('new/blogid',{"blog":blog})
})

const getEditBlogById = catchAsyn(async(req,res)=>{
  const blog = await vlogService.getBlogById(req.params.id)
  res.render('new/blogidedit',{"blog":blog})
})



const getLogin = catchAsyn(async(req,res)=>{
  res.render('new/login')
})

const getAllUser = catchAsyn(async(req,res)=>{
   const user = await vlogService.getAllUser()
   res.render('new/listuser',{"user":user})
})

const toggleApprove = catchAsyn(async(req,res)=>{
   await vlogService.userApprovalToggle(req.params.id)
   res.redirect('/api/v1/admin/user/all')
})


const deleteUser = catchAsyn(async(req,res)=>{
  await vlogService.deleteUser(req.params.id)
  res.redirect('/api/v1/admin/user/all')
})

const getTeam = catchAsyn(async(req,res)=>{
   res.render('new/team',{"district":listconst.districtList,"state":listconst.stateList})
})

// const createTeamNational = catchAsyn(async (req, res) => {
//   // const path = await uploadfile(req);
//   const team = await teamService.createTeam(req.body, 'national');
//   res.redirect('/api/v1/admin/team/national/all');
// });

const createTeamState =catchAsyn(async(req,res)=>{
    const path = await uploadfile(req)
    const team =await teamService.createTeam(req.body,path,"state")
    res.redirect('/api/v1/admin/team/state/all')

})
const createTeamDistrict =catchAsyn(async(req,res)=>{
  const path = await uploadfile(req)
  const team =await teamService.createTeam(req.body,path,"district")
  res.redirect('/api/v1/admin/team/district/all')

})

const getTeamStateList = catchAsyn(async(req,res)=>{
     const team = await teamService.getStateAllTeam()
     res.render('new/listteamstate',{"team":team})
})

const deleteTeam = catchAsyn(async(req,res)=>{
     const type =await teamService.deleteTeamById(req.params.id)
     res.redirect('/api/v1/admin/team/'+type+'/all')
})

const getTeamdistrictList = catchAsyn(async(req,res)=>{

  const team = await teamService.getDistrictAllTeam(req)
  res.render('new/listteamdistrict',{"team":team,"district":listconst.districtList})
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
    getAllLiterature,
    createBanner,
    getAllBanner,
    getCreateVlog,
    getLogin,
    getCreateLiterature,
    getCreateBlog,
    getCreateBanner,
    deleteBanner,
    deleteLiterature,
    deleteVlog,
    deleteBlog,
    getBlogById,
    getAllUser,
    toggleApprove,
    deleteUser,
    getTeam,
    createTeamState,
    getTeamStateList,
    getTeamdistrictList,
    createTeamDistrict,
    deleteTeam,
    getEditBlogById,
    // createTeamNational
}