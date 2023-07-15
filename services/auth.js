const { nullChecker } = require('../helper/null_checker')
const ApiError = require('../utils/api_error')
const httpStatus = require('http-status')
var validator = require("email-validator");
const UserModel = require('../model/user')
const bcrypt = require('bcryptjs')
const sendToken = require('../utils/sendtoken')


const signup = async (userBody) => {

    if (nullChecker(userBody.fullname))
        throw new ApiError(httpStatus.BAD_REQUEST, 'fullname_required');
    if (nullChecker(userBody.email) || !validator.validate(userBody.email))
        throw new ApiError(httpStatus.BAD_REQUEST, ' email_required');
    if (nullChecker(userBody.password))
        throw new ApiError(httpStatus.BAD_REQUEST, ' password_required');
    if (await UserModel.User.isEmailTaken(userBody.email))
        throw new ApiError(httpStatus.BAD_REQUEST, 'email_already_taken');
    if (nullChecker(userBody.phoneno))
        throw new ApiError(httpStatus.BAD_REQUEST, ' phone no required')
    if (nullChecker(userBody.pincode))
        throw new ApiError(httpStatus.BAD_REQUEST, ' pincode required')
    if (nullChecker(userBody.city))
        throw new ApiError(httpStatus.BAD_REQUEST, ' city required')
    if (nullChecker(userBody.state))
        throw new ApiError(httpStatus.BAD_REQUEST, ' state required')
    if (nullChecker(userBody.address))
        throw new ApiError(httpStatus.BAD_REQUEST, ' address required')
    if (nullChecker(userBody.referredby))
        throw new ApiError(httpStatus.BAD_REQUEST, 'referredby_required');
    if (nullChecker(userBody.pic))
        throw new ApiError(httpStatus.BAD_REQUEST, 'referredby_required');

    const usersBody = await UserModel.User.find().sort({ "userId": -1 }).limit(1);

    var userId;
    if (usersBody.length == 0) {
        userId = 1;
    } else {
        userId = usersBody[0].userId + 1;
    }


    return await UserModel.User.create({
        userId: userId,
        fullname: userBody.fullname,
        email: userBody.email,
        password: userBody.password,
        phoneno: userBody.phoneno,
        pic: userBody.pic,
        referredby: userBody.referredby,
        address: userBody.address,
        city: userBody.city,
        state: userBody.state,
        pincode: userBody.pincode,
        createdBy: Date.now()
    })

}


const login = async (userBody, res) => {
    if (nullChecker(userBody.email) || !validator.validate(userBody.email))
        throw new ApiError(httpStatus.BAD_REQUEST, ' email_required');
    if (nullChecker(userBody.password))
        throw new ApiError(httpStatus.BAD_REQUEST, ' password_required');
    const user = await UserModel.User.findOne({ email: userBody.email }).select("+password");
    if (!user)
        res.status(404).json({ success: false, message: "invalid user and password" })
    const isPasswordMatched = await bcrypt.compare(userBody.password, user.password);
    if (!isPasswordMatched) {
        res.status(401).json({ success: false, message: "Invalid email and password" })
    } else {
        const userLogged = await UserModel.User.findOne({ email: userBody.email })
        sendToken(userLogged, 200, res)
    }
}

const resetpass = async (userBody,req) => {
    if (nullChecker(userBody.password))
        throw new ApiError(httpStatus.BAD_REQUEST, ' password_required');
    // const user = await UserModel.User.findOne({ email: userBody.email }).select("+password");
    // if (!user)
    //     res.status(404).json({ success: false, message: "invalid user and password" })
    const isPasswordMatched = await bcrypt.compare(userBody.password, user.password);
    if (!isPasswordMatched) {
        res.status(401).json({ success: false, message: "Invalid email and password" })
    } else {
        const userLogged = await UserModel.User.findOne({ email: userBody.email })
        sendToken(userLogged, 200, res)
    }
}






module.exports = {
    signup,
    login,
    resetpass
}