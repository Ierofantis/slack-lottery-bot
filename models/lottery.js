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


// const mongoose = require('mongoose');

// const SessionSchema = mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//   },
//   session_id: {
//     type: String,
//     index: true,
//     required: true,
//   },
//   created_at: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('Session', SessionSchema);
