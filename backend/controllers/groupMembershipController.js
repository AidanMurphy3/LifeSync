const MemberService = require("../services/memberService");
const UpdateRoleService = require("../services/updateRoleService");


// add member
const addMember = async(req, res) =>{
    try{
        const groupMembership = await MemberService.addGroupMembership(req.body);

        await MemberService.updateGroup(groupMembership);
        await MemberService.updateUser(groupMembership);

        res.status(201).json({ 
            message: 'Add member successfully!', 
            data: groupMembership
        });
    }catch(error){
        res.status(500).json({ 
            message: 'Failed to create groupMembership!', 
            error: error.message 
        });
    }
}

//update role
const updateRole = async(req, res) => {
    try{
        const response = await UpdateRoleService.updateRole(req.body);

        res.status(201).json({ 
            message: 'Update role successfully!', 
            data: response
        });
    }catch(error){
        res.status(500).json({ 
            message: 'Failed to update role!', 
            error: error.message 
        });
    }
}

module.exports = {addMember, updateRole};