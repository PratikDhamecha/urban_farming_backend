const mongoose = require('mongoose');
const scheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  task: String,
  plantName: String,
  scheduledAt: Date,
  isCompleted: { type: Boolean, default: false },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Schedule', scheduleSchema);
