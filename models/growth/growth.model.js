const mongoose = require('mongoose');

const growthEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  plantName: String,
  heightInCm: Number,
  photoUrl: String,
  recordedAt: Date,
  notes: String
});
module.exports = mongoose.model('GrowthEntry', growthEntrySchema);

