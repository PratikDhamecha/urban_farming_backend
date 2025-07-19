const mongoose = require("mongoose");

const wateringLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  plantName: String,
  waterAmount: Number,
  wateredAt: Date,
  notes: String,
});
module.exports = mongoose.model("WateringLog", wateringLogSchema);
