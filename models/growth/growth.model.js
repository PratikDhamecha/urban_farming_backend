const mongoose = require('mongoose');

const growthEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  plantName: String,
  type: {
    type: String,
    required: true
  },
  photos: [{
    id: Number,
    url: String,
    date: Date,
    notes: String
  }
  ],
  trackingInterval: {
    type: String,
    enum: ['bi-weekly', 'weekly', 'monthly'],
    default: 'weekly'
  },
  nextDate : {
    type: Date,
  },
  plantingDate: {
    type: Date,
    default: Date.now
  },
  cultivatingDate: {
    type: Date,
  },
  recordedAt: {
    type : Date,
    default: Date.now
  },
});

// Pre-save hook to auto-increment index
growthEntrySchema.pre('save', async function (next) {
  if (this.isNew && this.photoUrl && this.photoUrl.photoUrl) {
    try {
      // Find the highest index for this user and plant
      const lastEntry = await this.constructor
        .findOne({
          userId: this.userId,
          plantName: this.plantName,
          'photoUrl.index': { $exists: true }
        })
        .sort({ 'photoUrl.index': -1 });

      // Set the next index
      this.photoUrl.index = lastEntry && lastEntry.photoUrl ?
        (lastEntry.photoUrl.index + 1) : 1;

      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model('GrowthEntry', growthEntrySchema);