const userModel = require('../../models/user/user.model');
const postModel = require('../../models/post/post.model');
const diagnosisModel = require('../../models/diagnosis/diagnosis.model');
const growthModel = require('../../models/growth/growth.model');
const BadgeService = require('../badge/badge.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserService {
    static registerUser = async (userData) => {
        try {
            const { email, password } = userData;
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new userModel({
                ...userData,
                password: hashedPassword
            }); 
            await newUser.save();
            return { message: 'User registered successfully', user: newUser };
        } catch (error) {
            throw new Error('Error registering user');
        }
    }

    static loginUser = async (email, password) => {
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                throw new Error('User not found');
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
            return { token };
        } catch (error) {
            throw new Error('Error logging in user');
        }
    }

    static getUserById = async (userId) => {
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error fetching user');
        }
    }

    static updateUser = async (userId, updateData) => {
        try {
            const { password } = updateData;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updateData.password = hashedPassword;
            }
            const user = await userModel.findByIdAndUpdate(userId, updateData, { new: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error fetching user');
        }
    }

    static deleteUser = async (userId) => {
        try {
            const user = await userModel.findByIdAndDelete(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return { message: 'User deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting user');
        }
    }

    // Get complete user profile with stats and badges
    static getUserProfile = async (userId) => {
        try {
            const user = await userModel.findById(userId).lean();
            if (!user) {
                throw new Error('User not found');
            }

            // Get user badges
            const badges = await BadgeService.getUserBadges(userId);

            // Calculate additional stats if needed
            const posts = await postModel.countDocuments({ userId });
            const diagnoses = await diagnosisModel.countDocuments({ userId });
            const growthEntries = await growthModel.countDocuments({ userId });
            
            // Calculate days active (simplified - you might want to track this differently)
            const daysSinceJoin = Math.floor((new Date() - user.createdAt) / (1000 * 60 * 60 * 24));

            const userProfile = {
                name: user.name,
                email: user.email,
                bio: user.bio || '',
                location: user.location || '',
                joinDate: user.createdAt.toISOString(),
                avatar: user.avatar || '',
                level: user.level,
                totalXP: user.totalXP,
                currentLevelXP: user.currentLevelXP,
                nextLevelXP: user.nextLevelXP,
                stats: {
                    cropsGrown: user.stats?.cropsGrown || growthEntries,
                    problemsSolved: user.stats?.problemsSolved || diagnoses,
                    knowledgeShared: user.stats?.knowledgeShared || posts,
                    communityPosts: user.stats?.communityPosts || posts,
                    daysActive: user.stats?.daysActive || daysSinceJoin,
                    seasonsCompleted: user.stats?.seasonsCompleted || 0,
                    soilTypesManaged: user.stats?.soilTypesManaged || 0,
                    organicCrops: user.stats?.organicCrops || 0,
                    farmersHelped: user.stats?.farmersHelped || 0
                },
                badges: badges
            };

            return userProfile;
        } catch (error) {
            throw new Error('Error fetching user profile');
        }
    }

    // Add XP to user and handle level ups
    static addXP = async (userId, xpAmount, reason = '') => {
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                throw new Error('User not found');
            }

            const newTotalXP = user.totalXP + xpAmount;
            const newCurrentLevelXP = user.currentLevelXP + xpAmount;

            // Farming-focused level calculation
            const levels = [
                { name: 'New Farmer', maxXP: 100 },
                { name: 'Apprentice Farmer', maxXP: 300 },
                { name: 'Skilled Farmer', maxXP: 600 },
                { name: 'Experienced Farmer', maxXP: 1200 },
                { name: 'Expert Farmer', maxXP: 2500 },
                { name: 'Master Farmer', maxXP: 5000 },
                { name: 'Agricultural Specialist', maxXP: 10000 },
                { name: 'Farming Legend', maxXP: 20000 }
            ];

            let currentLevel = levels[0];
            let nextLevel = levels[1];
            let currentLevelXP = newCurrentLevelXP;

            for (let i = 0; i < levels.length; i++) {
                if (newTotalXP >= levels[i].maxXP) {
                    currentLevel = levels[i];
                    nextLevel = levels[i + 1] || levels[i];
                    if (i > 0) {
                        currentLevelXP = newTotalXP - levels[i - 1].maxXP;
                    }
                } else {
                    break;
                }
            }

            const updatedUser = await userModel.findByIdAndUpdate(
                userId,
                {
                    totalXP: newTotalXP,
                    currentLevelXP: currentLevelXP,
                    nextLevelXP: nextLevel.maxXP,
                    level: currentLevel.name,
                    updatedAt: new Date()
                },
                { new: true }
            );

            return {
                user: updatedUser,
                xpAdded: xpAmount,
                leveledUp: currentLevel.name !== user.level,
                newLevel: currentLevel.name
            };
        } catch (error) {
            throw new Error('Error adding XP');
        }
    }

    // Update user stats
    static updateUserStats = async (userId, statType, increment = 1) => {
        try {
            const updateField = `stats.${statType}`;
            const user = await userModel.findByIdAndUpdate(
                userId,
                { 
                    $inc: { [updateField]: increment },
                    updatedAt: new Date()
                },
                { new: true }
            );

            if (!user) {
                throw new Error('User not found');
            }

            // Award XP based on activity
            const xpRewards = {
                cropsGrown: 25,
                problemsSolved: 20,
                knowledgeShared: 15,
                communityPosts: 10,
                seasonsCompleted: 50,
                soilTypesManaged: 30,
                organicCrops: 35,
                farmersHelped: 20
            };

            if (xpRewards[statType]) {
                await this.addXP(userId, xpRewards[statType], `${statType} activity`);
            }

            return user;
        } catch (error) {
            throw new Error('Error updating user stats');
        }
    }
}

module.exports = UserService;
// This service handles user registration, login, fetching, updating, and deleting user data.
