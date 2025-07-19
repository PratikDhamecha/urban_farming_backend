const mongoose = require('mongoose');

const userBadgeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  badgeId: { type: String, required: true },
  earned: { type: Boolean, default: false },
  earnedDate: Date,
  progress: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Compound index to ensure one record per user-badge combination
userBadgeSchema.index({ userId: 1, badgeId: 1 }, { unique: true });

module.exports = mongoose.model('UserBadge', userBadgeSchema);
