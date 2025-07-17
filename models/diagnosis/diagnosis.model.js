const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  imageUrl: String,
  result: String,
  confidence: Number,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Diagnosis', diagnosisSchema);
