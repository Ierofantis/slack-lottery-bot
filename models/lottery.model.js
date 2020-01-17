const mongoose = require("mongoose");

const LotterySchema = new mongoose.Schema(
  {
    max_winners: Number,
    start_date: String,
    time_window: Number,
    active: Boolean,
    question: String,
    participants: [String],
    winners: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lottery", LotterySchema);
