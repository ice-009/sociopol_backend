const VlogModel = require('../../model/vlog')
const BlogModel = require('../../model/blog')
const LiteratureModel = require('../../model/literature')
const { nullChecker } = require('../../helper/null_checker')
const ApiError = require('../../utils/api_error')
const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const sendToken = require('../../utils/sendtoken')



const createVlog = async (body) => {
    console.log(body)
    if (nullChecker(body.title))
        throw new ApiError(httpStatus.BAD_REQUEST, 'title_required');
    if (nullChecker(body.url))
        throw new ApiError(httpStatus.BAD_REQUEST, ' url_required');

    const vlogsBody = await VlogModel.Vlog.find().sort({ "vlogId": -1 }).limit(1);

    var vlogId;
    if (vlogsBody.length == 0) {
        vlogId = 1;
    } else {
        vlogId = vlogsBody[0].vlogId + 1;
    }

    return await VlogModel.Vlog.create({
        vlogId: vlogId,
        title: body.title,
        url: body.url,
        createat: Date.now()

    })

}


const getAllVlog = async () => {
    return await VlogModel.Vlog.find();
}

const getAllBlog = async()=>{
    return await BlogModel.Blog.find();
}


const createBlog = async (body) => {

    if (nullChecker(body.title))
        throw new ApiError(httpStatus.BAD_REQUEST, 'title_required');
    if (nullChecker(body.bannerurl))
        throw new ApiError(httpStatus.BAD_REQUEST, 'banner_url_required');
    if (nullChecker(body.thumbnailurl))
        throw new ApiError(httpStatus.BAD_REQUEST, 'thumbnailurl_required');

    const blogsBody = await BlogModel.Blog.find().sort({ "blogId": -1 }).limit(1);

    var blogId;
    if (blogsBody.length == 0) {
        blogId = 1;
    } else {
        blogId = blogsBody[0].blogId + 1;
    }

    return await BlogModel.Blog.create({
        blogId: blogId,
        title: body.title,
        description: body.description,
        bannerurl: body.bannerurl,
        thumbnailurl: body.thumbnailurl,
        images: body.images,
        createat: Date.now(),
        date: body.date,
        blogtype: body.blogtype
    })
}



const createLiterature = async (body) => {
    console.log(body)
    if (nullChecker(body.title))
        throw new ApiError(httpStatus.BAD_REQUEST, 'title_required');
    if (nullChecker(body.fileurl))
        throw new ApiError(httpStatus.BAD_REQUEST, 'file_url_required');

    const literatureBody = await LiteratureModel.Literature.find().sort({ "literatureId": -1 }).limit(1);

    var literatureId;
    if (literatureBody.length == 0) {
        literatureId = 1;
    } else {
        literatureId = literatureBody[0].literatureId + 1;
    }

    return await LiteratureModel.Literature.create({
        literatureId:literatureId,
        title:body.title,
        fileurl:body.fileurl,
        createat:Date.now()
    })

}


const getAllLiterature = async()=>{
    return await LiteratureModel.Literature.find();
}


module.exports = {
    createVlog,
    getAllVlog,
    createBlog,
    createLiterature,
    getAllBlog,
    getAllLiterature
}