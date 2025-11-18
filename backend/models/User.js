const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Enum for user roles
const RoleTypeEnum = ['Admin', 'GroupOwner', 'Moderator', 'Viewer'];

// Define the User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'User name is required.'],
        trim: true,
        maxlength: 100
    },

    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        lowercase: true, 
        trim: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email address'] 
    },

    passwordHash: {
        type: String,
        required: [true, 'Password hash is required.'],
        select: false // SECURITY: Exclude this field from query results by default
    },

    roleType: {
        type: String,
        enum: {
            values: RoleTypeEnum,
            message: 'Invalid role type: {VALUE}'
        },
        default: 'Viewer'
    },
    
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'], 
        default: 'active'
    },

    // --- FRIENDS FEATURE FIELDS ---
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    friendRequestsSent: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    friendRequestsReceived: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    // 
    
    joinedGroups: [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }],
}, {
    timestamps: true // 
});

module.exports = mongoose.model('User', UserSchema);