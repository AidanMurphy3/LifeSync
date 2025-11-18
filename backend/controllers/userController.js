const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust path as needed
const bcrypt = require('bcrypt');

// Helper function for consistent error handling and Mongoose ID check
const handleControllerError = (res, error, defaultMessage, status = 500) => {
    // 400 Bad Request for invalid Mongoose ID format
    if (error.kind === 'ObjectId' || (error.name === 'CastError' && error.path === '_id')) {
        return res.status(400).json({ message: 'Invalid ID format provided.', error: error.message });
    }
    // 400 Bad Request for validation errors or unique constraint violations
    if (error.name === 'ValidationError' || (error.code === 11000 && error.keyPattern && error.keyPattern.email)) {
        let msg = defaultMessage;
        if (error.code === 11000) msg = 'Email already in use.';
        return res.status(400).json({ message: msg, error: error.message });
    }
    // Default 500 Server Error
    res.status(status).json({ message: defaultMessage, error: error.message });
};

// ----------------------------------------------------------------------
// C R U D (CORE)
// ----------------------------------------------------------------------

// POST /users - Add user (C) (Registration)

const addUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Create user
        const newUser = new User({
            name,
            email,
            passwordHash,
            roleType: 'Viewer', // enforce default role
        });

        await newUser.save();

        // Prepare response
        const userResponse = newUser.toObject();
        delete userResponse.passwordHash;

        res.status(201).json({ message: 'User created successfully.', data: userResponse });

    } catch (error) {
        if (error.code === 11000) { // duplicate key
            return res.status(400).json({ message: 'Email already exists.' });
        }
        console.error(error);
        res.status(500).json({ message: 'Failed to register user.', error: error.message });
    }
};


// GET /users - Get all users (R - All)
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-passwordHash'); // Exclude hash by default
        res.status(200).json({ data: users });
    } catch (error) {
        handleControllerError(res, error, 'Failed to retrieve users.', 500);
    }
};

// GET /users/:id - Get user by ID (R - One)
const getUsersById = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format provided.' });
    }
    try {
        const user = await User.findById(req.params.id).select('-passwordHash');
        if (!user) return res.status(404).json({ message: 'User not found.' });
        res.status(200).json({ data: user });
    } catch (error) {
        handleControllerError(res, error, 'Error retrieving user.', 500);
    }
};

// GET /users/name/:name - Get user by name (R - By Name)
const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ name: req.params.name }).select('-passwordHash');
        if (!user) return res.status(404).json({ message: 'User not found.' });
        res.status(200).json({ data: user });
    } catch (error) {
        handleControllerError(res, error, 'Error retrieving user by name.', 500);
    }
};

// PATCH /users/:id - Update user (U)
const updateUser = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format provided.' });
    }
    
    // NOTE: If updating password, you must hash the new password before updating.
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        ).select('-passwordHash');

        if (!updatedUser) return res.status(404).json({ message: 'User not found.' });
        
        res.status(200).json({ message: 'User updated successfully.', data: updatedUser });
    } catch (error) {
        handleControllerError(res, error, 'Failed to update user.', 400);
    }
};

// DELETE /users/:id - Delete user (D)
const deleteUser = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format provided.' });
    }
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found.' });
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        handleControllerError(res, error, 'Failed to delete user.', 500);
    }
};

// ----------------------------------------------------------------------
// U T I L I T Y / P E R M I S S I O N S
// ----------------------------------------------------------------------

// PATCH /users/:id/permission - Change user role/permission
const changePermission = async (req, res) => {
    const { roleType } = req.body;
    const userId = req.params.id;
    
    // NOTE: You'd typically add authentication/authorization checks here (e.g., must be Admin).

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format.' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { roleType: roleType },
            { new: true, runValidators: true }
        ).select('-passwordHash');

        if (!updatedUser) return res.status(404).json({ message: 'User not found.' });
        
        res.status(200).json({ 
            message: `User role updated to ${updatedUser.roleType}.`, 
            data: updatedUser 
        });
    } catch (error) {
        handleControllerError(res, error, 'Failed to change user permission.', 400);
    }
};

// ----------------------------------------------------------------------
// F R I E N D S H I P (Placeholder Logic)
// ----------------------------------------------------------------------

// POST /users/:recipientId/send-request - Send friend request
const sendFriendRequest = async (req, res) => {
    // Replace with your actual authenticated user ID extraction (e.g., from JWT payload)
    const senderId = req.user ? req.user.id : 'MOCK_SENDER_ID'; 
    const recipientId = req.params.recipientId;
    
    if (!mongoose.Types.ObjectId.isValid(recipientId)) {
        return res.status(400).json({ message: 'Invalid recipient ID format.' });
    }
    if (senderId === recipientId) {
        return res.status(400).json({ message: 'Cannot send a request to yourself.' });
    }

    try {
        // Use $addToSet to prevent duplicates
        // 1. Update the recipient (add sender to received list)
        await User.findByIdAndUpdate(recipientId, {
            $addToSet: { friendRequestsReceived: senderId }
        });

        // 2. Update the sender (add recipient to sent list)
        const sender = await User.findByIdAndUpdate(senderId, {
            $addToSet: { friendRequestsSent: recipientId }
        }, { new: true });

        res.status(200).json({ 
            message: 'Friend request sent successfully. Waiting for acceptance.',
            data: sender.friendRequestsSent
        });
    } catch (error) {
        handleControllerError(res, error, 'Failed to send friend request.', 500); 
    }
};

// POST /users/:senderId/accept-request - Accept friend request
const acceptFriendRequest = async (req, res) => {
    // Replace with your actual authenticated user ID (the one accepting the request)
    const acceptorId = req.user ? req.user.id : 'MOCK_ACCEPTOR_ID'; 
    const senderId = req.params.senderId;
    
    if (!mongoose.Types.ObjectId.isValid(senderId)) {
        return res.status(400).json({ message: 'Invalid sender ID format.' });
    }

    try {
        // 1. Add both users to each other's friends list
        await User.findByIdAndUpdate(acceptorId, {
            $addToSet: { friends: senderId },
            $pull: { friendRequestsReceived: senderId } // Remove from received list
        });

        const sender = await User.findByIdAndUpdate(senderId, {
            $addToSet: { friends: acceptorId },
            $pull: { friendRequestsSent: acceptorId } // Remove from sent list
        }, { new: true }).select('-passwordHash');

        res.status(200).json({ 
            message: 'Friend request accepted!',
            data: sender
        });
    } catch (error) {
        handleControllerError(res, error, 'Failed to accept friend request.', 500);
    }
};

// DELETE /users/:friendId/remove-friend - Remove a friend
const removeFriend = async (req, res) => {
    const userId = req.user ? req.user.id : 'MOCK_USER_ID';
    const friendId = req.params.friendId;

    if (!mongoose.Types.ObjectId.isValid(friendId)) {
        return res.status(400).json({ message: 'Invalid friend ID format.' });
    }
    
    try {
        // 1. Remove friendId from userId's friends list
        await User.findByIdAndUpdate(userId, {
            $pull: { friends: friendId }
        });

        // 2. Remove userId from friendId's friends list
        await User.findByIdAndUpdate(friendId, {
            $pull: { friends: userId }
        });

        res.status(200).json({ message: 'Friend removed successfully.' });
    } catch (error) {
        handleControllerError(res, error, 'Failed to remove friend.', 500);
    }
};


module.exports = {
    getUser, 
    getUsersById,
    getUsers, 
    deleteUser, 
    addUser, 
    updateUser, // Assuming this is defined
    changePermission,
    sendFriendRequest,
    acceptFriendRequest,
    removeFriend
};