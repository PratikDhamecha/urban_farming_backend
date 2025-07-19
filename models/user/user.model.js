const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
  },
  bio: {
    type: String,
    default: "",
    maxlength: [500, "Bio cannot exceed 500 characters"],
    trim: true,
  },
  location: {
    type: String,
    default: "",
    maxlength: [100, "Location cannot exceed 100 characters"],
    trim: true,
  },
  avatar: {
    type: String,
    default: "",
    // Stores the image URL served from GridFS
  },
  level: {
    type: String,
    default: "New Farmer",
    enum: {
      values: [
        "New Farmer",
        "Apprentice Farmer",
        "Skilled Farmer",
        "Experienced Farmer",
        "Expert Farmer",
        "Master Farmer",
        "Agricultural Specialist",
        "Farming Legend",
      ],
      message: "Invalid farming level",
    },
  },
  totalXP: {
    type: Number,
    default: 0,
    min: [0, "Total XP cannot be negative"],
  },
  currentLevelXP: {
    type: Number,
    default: 0,
    min: [0, "Current level XP cannot be negative"],
  },
  nextLevelXP: {
    type: Number,
    default: 100,
    min: [1, "Next level XP must be at least 1"],
  },
  stats: {
    cropsGrown: {
      type: Number,
      default: 0,
      min: [0, "Crops grown cannot be negative"],
    },
    problemsSolved: {
      type: Number,
      default: 0,
      min: [0, "Problems solved cannot be negative"],
    },
    knowledgeShared: {
      type: Number,
      default: 0,
      min: [0, "Knowledge shared cannot be negative"],
    },
    communityPosts: {
      type: Number,
      default: 0,
      min: [0, "Community posts cannot be negative"],
    },
    daysActive: {
      type: Number,
      default: 0,
      min: [0, "Days active cannot be negative"],
    },
    seasonsCompleted: {
      type: Number,
      default: 0,
      min: [0, "Seasons completed cannot be negative"],
    },
    soilTypesManaged: {
      type: Number,
      default: 0,
      min: [0, "Soil types managed cannot be negative"],
    },
    organicCrops: {
      type: Number,
      default: 0,
      min: [0, "Organic crops cannot be negative"],
    },
    farmersHelped: {
      type: Number,
      default: 0,
      min: [0, "Farmers helped cannot be negative"],
    },
    totalYield: {
      type: Number,
      default: 0,
      min: [0, "Total yield cannot be negative"],
    },
    landAreaManaged: {
      type: Number,
      default: 0,
      min: [0, "Land area managed cannot be negative"],
    },
  },
  lastActiveDate: {
    type: Date,
    default: Date.now,
    validate: {
      validator: function (v) {
        return v <= new Date();
      },
      message: "Last active date cannot be in the future",
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true, // Cannot be changed after creation
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to update the updatedAt field
userSchema.pre("save", function (next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

// Pre-update middleware to update the updatedAt field
userSchema.pre(
  ["findOneAndUpdate", "updateOne", "updateMany"],
  function (next) {
    this.set({ updatedAt: new Date() });
    next();
  }
);

// Virtual for user's full profile completeness percentage
userSchema.virtual("profileCompleteness").get(function () {
  let completeness = 0;
  const totalFields = 4;

  if (this.name && this.name.trim().length > 0) completeness++;
  if (this.email && this.email.trim().length > 0) completeness++;
  if (this.bio && this.bio.trim().length > 0) completeness++;
  if (this.location && this.location.trim().length > 0) completeness++;
  if (this.avatar && this.avatar.trim().length > 0) completeness++;

  return Math.round((completeness / totalFields) * 100);
});

// Instance method to check if user is active recently
userSchema.methods.isRecentlyActive = function () {
  const daysSinceActive = Math.floor(
    (new Date() - this.lastActiveDate) / (1000 * 60 * 60 * 24)
  );
  return daysSinceActive <= 7; // Consider active if logged in within 7 days
};

// Static method to find users by farming level
userSchema.statics.findByLevel = function (level) {
  return this.find({ level: level });
};

module.exports = mongoose.model("User", userSchema);
