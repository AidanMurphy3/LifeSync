const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Enum
const TaskType = ["Task", "Habit"];
const TaskStatus = ["Pending", "Approved", "Rejected", "Completed"];

const TaskSchema = new Schema({
  groupId: {
    type: Schema.Types.ObjectId,
    ref: 'Group',
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String, 
    enum: TaskType,
    required: true
  },
  status: {
    type: String, 
    enum: TaskStatus,
    required: true
  },
  dueDate: {
    type: Date
  },
  frequency: {
    type: String
  },
  progress: {
    type: Number,
  },
  aiSuggested: {
    type: Boolean,
  }
},{
    timestamps: { 
        createdAt: 'createdAt', 
        updatedAt: 'updatedAt' 
    }
});

module.exports = mongoose.model('Task', TaskSchema);
