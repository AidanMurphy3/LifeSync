
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Enum 
const RoleTypeEnum = ['Admin', 'GroupOwner', 'Moderator', 'Viewer'];

// Define the User Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  
  email: {
    type: String,
    required: true,
    unique: true // Ensures no two users share the same email
  },
  
  passwordHash: {
    type: String,
    required: true
  },
  
  roleType: {
    type: String,
    enum: RoleTypeEnum,
    default: 'Viewer' // Assuming 'Viewer' is the most basic role
  },
    status: {
        type:String,
        default: 'active'
    }

    ,
  
  joinedGroups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }],
}, {
  timestamps: { 
    createdAt: 'createdAt', 
    updatedAt: 'updatedAt' 
  }
});

module.exports = mongoose.model('User', UserSchema);
