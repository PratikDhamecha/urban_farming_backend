const mongoose = require('mongoose');

const wateringLogSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  plantName: {
    type: String,
    required: true,
    trim: true
  },
  waterAmount: {
    type: Number,
    required: true,
    min: 0,
    max: 100 // Assuming liters, adjust as needed
  },
  wateredAt: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Add indexes for better query performance
wateringLogSchema.index({ userId: 1 });
wateringLogSchema.index({ wateredAt: -1 });

// Add virtuals or methods if needed
wateringLogSchema.virtual('formattedDate').get(function() {
  return this.wateredAt.toLocaleDateString();
});

const WateringLog = mongoose.model('WateringLog', wateringLogSchema);

module.exports = WateringLog;