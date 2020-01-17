const mongoose = require("mongoose");

const LotterySchema = new mongoose.Schema(
  {
    max_winners: Integer,
    start_date: String,
    time_window: Integer,
    participants: [String],
    winners: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lottery", LotterySchema);
