const GroupMembership = require("../models/groupMembershipModel");

const updateRole = async(data) => {
    const {role, groupMembershipId} = data;

    if(!role){
        throw new Error("Missing role!");
    }

    const groupMembership = await GroupMembership.findById(groupMembershipId);
    groupMembership.role = role;

    groupMembership.save();

    const response = groupMembership.toObject();
    response.groupMembershipId = response._id;
    delete response._id;

    return response;
}