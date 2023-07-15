const AdminModel = require('../../model/admin')
const { nullChecker } = require('../../helper/null_checker')
const ApiError = require('../../utils/api_error')
const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const sendToken = require('../../utils/sendtoken')



const login = async (body,res) => {
    console.log(body)
    if (nullChecker(body.username))
        throw new ApiError(httpStatus.BAD_REQUEST, 'username_required');
    if (nullChecker(body.password))
        throw new ApiError(httpStatus.BAD_REQUEST, ' password_required');

    const admin = await AdminModel.Admin.findOne({ username:body.username }).select("+password");
    if (!admin)
        res.status(404).json({ success: false, message: "invalid user and password" })
    const isPasswordMatched = await bcrypt.compare(body.password, admin.password);
    if (!isPasswordMatched) {
        res.status(401).json({ success: false, message: "Invalid email and password" })
    } else {
        const adminLogged = await AdminModel.Admin.findOne({ username:body.username })
        sendToken(adminLogged, 200, res)
    }
}


const createAdmin = async () => {
    await AdminModel.Admin.create({
        userId: 1,
        username: 'admin',
        password: 'admin',
        admintype: 'admin',
        createdat: Date.now()
    })
}

module.exports = {
    login
}