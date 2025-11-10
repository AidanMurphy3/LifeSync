
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Enum definitions 
const GroupTypeEnum = ['Personal', 'Family', 'Work', 'Other']; 
const PrivacySettingEnum = ['Public', 'Private'];

// Define the Group Schema
const GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type:String,
        required: true
    }
    ,
    groupType: {
        type: String,
        enum: GroupTypeEnum // Assuming an appropriate enum for group types
    },

    privacySetting: {
        type: String,
        enum: PrivacySettingEnum,
        default: 'Private'
    },
    owner: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    }
    ,

    members: [{
        type: Schema.Types.ObjectId,
        ref: 'GroupMembership' // References a separate joining table/schema
    }],

}, {
    timestamps: { 
        createdAt: 'createdAt', 
        updatedAt: 'updatedAt' 
    }
});

module.exports = mongoose.model('Group', GroupSchema);
