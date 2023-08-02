const { nullChecker } = require('../../helper/null_checker')
const ApiError = require('../../utils/api_error')
const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const sendToken = require('../../utils/sendtoken')
const sendTokenWeb = require('../../utils/stweb')
const TeamModel = require('../../model/team')
const listconst = require('../data/district')

const createTeam = async (body, path, type) => {
    console.log(body)
    if (nullChecker(body.name))
        throw new ApiError(httpStatus.BAD_REQUEST, 'teamname_required');

    if (nullChecker(path))
        throw new ApiError(httpStatus.BAD_REQUEST, 'image_required');
    if (nullChecker(body.postname))
        throw new ApiError(httpStatus.BAD_REQUEST, 'postname_required');
    if (nullChecker(body.sequenceno))
        throw new ApiError(httpStatus.BAD_REQUEST, 'sequenceno_required');
    
    if (type == 'state') {
        if (nullChecker(body.state))
            throw new ApiError(httpStatus.BAD_REQUEST, 'state_required');
    } else {
        if (nullChecker(body.district))
            throw new ApiError(httpStatus.BAD_REQUEST, 'district_required');
    }



    var locationId;
    if (type == 'state') {
        locationId = listconst.stateList.indexOf(body.state)+1
    } else {
        locationId = listconst.stateList.length + listconst.districtList.indexOf(body.district) +1
    }


    const teambody = await TeamModel.Team.find().sort({ "teamId": -1 }).limit(1);

    var teamId;
    if (teambody.length == 0) {
        teamId = 1;
    } else {
        teamId = teambody[0].teamId + 1;
    }

    return await TeamModel.Team.create({
        teamId: teamId,
        name: body.name,
        type: type,
        image: path,
        // userId:body.userId,
        postname: body.postname,
        sequenceno: body.sequenceno,
        locationId: locationId
        // state:body.state
    })

}


const deleteTeamById = async (id) => {
    const team = await TeamModel.Team.findOne({ "teamId": id })
    const type = team.type
    await TeamModel.Team.findOneAndDelete({ "teamId": id })
    return type
}

const getStateAllTeam = async () => {
    const teams = await TeamModel.Team.find()
    //  console.log(teams[1].type)
    var stateTeam = [];
    for (let index = 0; index < teams.length; index++) {
        const element = teams[index];
        // console.log(element)
        if (element.type == 'state') {
            stateTeam.push(element)
        }

    }
    return stateTeam;
}
const getDistrictAllTeam = async()=>{
    const teams = await TeamModel.Team.find()
    //  console.log(teams[1].type)
    var districtTeam = [];
    for (let index = 0; index < teams.length; index++) {
        const element = teams[index];
        // console.log(element)
        if (element.type != 'state') {
            districtTeam.push(element)
        }

    }
    return districtTeam;
}


module.exports = {
    createTeam,
    getStateAllTeam,
    deleteTeamById,
    getDistrictAllTeam
}