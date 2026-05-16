import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending"
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },

    dueDate: {
      type: Date
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    documents: [
      {
        fileName: {
          type: String
        },

        filePath: {
          type: String
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

export const Task = mongoose.model("Task", taskSchema);