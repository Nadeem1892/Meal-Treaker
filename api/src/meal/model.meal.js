const mongoose = require("mongoose")
const maelSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    meal_name: {
      type: String,
      required: true
    },
    calories: {
      type: Number,
      required: true
    },
    protein: {
      type: Number,
      required: true
    },
    carbs: {
      type: Number,
      required: true
    },
    fat: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
      required: true
    },
    date: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("meals", maelSchema);
