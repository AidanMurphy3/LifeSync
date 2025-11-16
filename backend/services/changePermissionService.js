const User = require("../models/User");

const changePermission = async(data) => {
    const {userId, roleType} = data;

    if(!userId){
        throw new Error("Missing userId!");
    }

    if(!roleType){
        throw new Error("Missing roleType!");
    }

    const user = await User.findById(userId);
    user.roleType = roleType;

    //Update timestamp
    user.save();

    const response = user.toObject();
    response.userId = response._id;
    delete response._id;

    return response;
}