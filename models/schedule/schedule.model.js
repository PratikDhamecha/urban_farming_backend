const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: String, required: true },
  plantName: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  isCompleted: { type: Boolean, default: false },
  notes: String,
  type: { 
    type: String, 
    enum: ['planting', 'watering', 'maintenance', 'harvest'],
    required: true
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
