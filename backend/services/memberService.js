const GroupMembership = require("../models/groupMembershipModel");
const Group = require("../models/groupModel");
const User = require("../models/User");

const addGroupMembership = async(data) => {
    const {groupId, userId, joinDate, role, status} = data;

        if(!groupId){
            throw new Error("Missing groupId!")
        }

        if(!userId){
            throw new Error("Missing userId!");
        }

        if(!joinDate){
            throw new Error("Missing joinDate!");
        }

        const newGroupMembership = await GroupMembership.create({
            userId,
            groupId,
            role,
            joinDate,
            status
        });

        const groupMembershipResponse = newGroupMembership.toObject();
        groupMembershipResponse.groupMembershipId = groupMembershipResponse._id;
        delete groupMembershipResponse._id;

        return groupMembershipResponse;
}

const updateGroup = async(data) => {
    const {groupMembershipId, groupId} = data;

    if(!groupMembershipId){
        throw new Error("Missing groupMembershipId!");
    }

    if(!groupId){
        throw new Error("Missing groupId!");
    }

    const group = await Group.findById(groupId);
    if (!group) {
        throw new Error('Group not found');
    }

    group.members.push(groupMembershipId);

    //Update timestamp
    await group.save();
}

const updateUser = async(data) => {
    const {groupId, userId} = data;

    if(!groupId){
        throw new Error("Missing groupId!");
    }

    if(!userId){
        throw new Error("Missing userId");
    }

    const user = await User.findById(userId);
    if(!user){
        throw new Error("User not found!");
    }

    user.joinedGroups.push(groupId);

    //Update timestamp
    await user.save();
}