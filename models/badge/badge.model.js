const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  badgeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: String,
  category: { 
    type: String, 
    enum: [
      'crop_management',      // Different types of crops (cereals, vegetables, fruits, etc.)
      'soil_expertise',       // Soil types and management
      'seasonal_farming',     // Seasonal crop cycles
      'sustainable_farming',  // Organic, eco-friendly practices
      'community_helper',     // Helping other farmers
      'knowledge_sharing',    // Teaching and sharing expertise
      'innovation',          // New techniques, technology adoption
      'achievement',         // General farming milestones
      'specialist'           // Expert in specific areas
    ],
    required: true 
  },
  rarity: { 
    type: String, 
    enum: ['common', 'rare', 'epic', 'legendary'],
    required: true 
  },
  criteria: {
    type: String, // Describes how to earn the badge
    required: true
  },
  maxProgress: { type: Number, default: 1 }, // For progress-based badges
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Badge', badgeSchema);
