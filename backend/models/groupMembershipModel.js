const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Enum
const MemberStatus = ["Active", "Inactive", "Flagged"];
const MemberRole = ["Owner", "Moderator", "Member", "Viewer"];

// Define the GroupMembership schema
const GroupMembershipSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },

    role: {
        type: String,
        enum: MemberRole,
        default: 'Member'
    },

    joinDate: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: MemberStatus,
        default: 'Active'
    }
});

module.exports = mongoose.model('GroupMembership', GroupMembershipSchema);