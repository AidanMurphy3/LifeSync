const Group = require('../models/groupModel');


//GET all groups
const getAllGroups = async ( req, res ) => {
    try
    {
        const groups = await Group.find();
        res.status(200).json({groups});
    }
    catch(e){
        return res.status(404).json({message : e.message});
    }
}

const addGroup = async (req, res) => {

    const { name, description, groupType, privacySetting, owner } = req.body;
    // Validation check for required fields
    if (!name || !description || !owner) {
        return res.status(400).json({ message: 'Missing required fields: name, description, and owner (User ID).' });
    }

    try {
        const newGroup = await Group.create({
            name,
            description,
            groupType,
            privacySetting,
            owner
        });

        const groupResponse = await Group.findById(newGroup._id).populate('owner', 'name email');

        res.status(201).json({ 
            message: 'Group created successfully', 
            data: groupResponse
        });

    } catch (e) {
        res.status(500).json({ 
            message: 'Failed to create group', 
            error: e.message 
        });
    }
}


// DELETE group by ID
const deleteGroup = async (req, res) => {
    try {
        const group = await Group.findByIdAndDelete(req.params.id);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.status(200).json({ message: 'Group deleted successfully', group });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {getAllGroups, addGroup, deleteGroup };

