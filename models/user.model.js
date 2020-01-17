const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  slack_id: String,
  slack_alias: String,
  reg_alias: String,
  probability: Number
});

module.exports = mongoose.model("User", UserSchema);
