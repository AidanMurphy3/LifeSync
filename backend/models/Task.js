const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Personal", "Work", "Other"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed", "Approved"],
      default: "Pending",
    },
    dueDate: {
      type: Date,
    },
    frequency: {
      type: String, // e.g., "Daily", "Weekly", "Monthly"
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    aiSuggested: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// -------------------
// 🔹 Custom Methods
// -------------------

// Mark a task as completed
TaskSchema.methods.markComplete = function () {
  this.status = "Completed";
  this.progress = 100;
  return this.save();
};

// Approve a completed task
TaskSchema.methods.approve = function () {
  if (this.status === "Completed") {
    this.status = "Approved";
  }
  return this.save();
};

// Assign a member (optional field)
TaskSchema.methods.assignMember = function (memberId) {
  this.assignedTo = memberId;
  return this.save();
};

module.exports = mongoose.model("Task", TaskSchema);
