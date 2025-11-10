

const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

//GET ALL USERS
const getUsers = async (req, res) => {
    try
    { 
        //fetch all
        const users = await User.find();
        res.status(200).json({users});
    }
    catch(e)
    {
        res.status(404).json({message: e.message});
    }
};


const addUser = async (req, res) => {
    const { name, email, passwordHash, roleType, status } = req.body;

    // Basic validation
    if (!name || !email || !passwordHash) {
        return res.status(400).json({ message: 'Missing required fields: name, email, and passwordHash.' });
    }

    try {
        const newUser = await User.create({
            name,
            email,
            passwordHash,
            roleType,
            status
        });

        // Return the created user, excluding the hash
        const userResponse = newUser.toObject();
        delete userResponse.passwordHash;

        res.status(201).json({ 
            message: 'User created successfully', 
            data: userResponse 
        });

    } catch (error) {
        // Handle Mongoose duplicate key error (for unique email)
        if (error.code === 11000) {
            return res.status(409).json({ message: 'Email already exists.', field: error.keyValue });
        }
        res.status(500).json({ 
            message: 'Failed to create user', 
            error: error.message 
        });
    }
}



//DELETE - /api/users/:id

const deleteUser = async (req, res) => {
   try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) return res.status(404).json({message: "User not found"});

        res.json({message: "User deleted successful", user});
    }
    catch(e)
    {
        res.status(500).json({message: error.message});
    }
};

module.exports = {deleteUser, addUser, getUsers};
