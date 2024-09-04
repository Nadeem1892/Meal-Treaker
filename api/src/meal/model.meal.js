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
      type: String,
      required: true
    },
    protein: {
      type: String,
      required: true
    },
    carbs: {
      type: String,
      required: true
    },
    fat: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner'],
      required: true
    },
    date: {
      type: String,
      required: true,
      default: function() {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based in JavaScript
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
      }
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("meals", maelSchema);
