const mongoose = require("mongoose");

const dailyUpdateSchema = new mongoose.Schema(
  {
    date: {
      type: String, // Format DD-MM-YYYY
      required: true,
    },
    isChecked: {
        type: Boolean,
        default: false // Default value for whether the daily update is checked ...
      }
  },
  { _id: false }
);

const challengeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    startDate: {
      type: String, // DD-MM-YYYY format
      required: true,
    },
    endDate: {
      type: String, // DD-MM-YYYY format
      required: true,
    },
    challengeName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isCompleted: {
      type: Boolean,
      default: true,
    },
    dailyUpdates: [dailyUpdateSchema], // Array to store daily challenge
  },
  { timestamps: true }
);

const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
