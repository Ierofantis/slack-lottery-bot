const mongoose = require("mongoose");

const LotterySchema = mongoose.Schema(
  {
    max_winners: Number,
    time_window: Number,
    active: Boolean,
    question: String,
    participants: [String],
    winners: [String]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lottery', LotterySchema);

