const BadgeModel = require('../../models/badge/badge.model');
const UserBadgeModel = require('../../models/userBadge/userBadge.model');

class BadgeService {
    // Get all available badges
    static getAllBadges = async () => {
        try {
            const badges = await BadgeModel.find({ isActive: true });
            return badges;
        } catch (error) {
            throw new Error('Error fetching badges');
        }
    }

    // Get user's badges with progress
    static getUserBadges = async (userId) => {
        try {
            const userBadges = await UserBadgeModel.find({ userId }).lean();
            const allBadges = await BadgeModel.find({ isActive: true }).lean();
            
            const badgesWithProgress = allBadges.map(badge => {
                const userBadge = userBadges.find(ub => ub.badgeId === badge.badgeId);
                
                return {
                    id: badge.badgeId,
                    name: badge.name,
                    description: badge.description,
                    icon: badge.icon,
                    category: badge.category,
                    rarity: badge.rarity,
                    earned: userBadge?.earned || false,
                    earnedDate: userBadge?.earnedDate,
                    progress: userBadge?.progress || 0,
                    maxProgress: badge.maxProgress
                };
            });
            
            return badgesWithProgress;
        } catch (error) {
            throw new Error('Error fetching user badges');
        }
    }

    // Award a badge to a user
    static awardBadge = async (userId, badgeId) => {
        try {
            const userBadge = await UserBadgeModel.findOneAndUpdate(
                { userId, badgeId },
                { 
                    earned: true, 
                    earnedDate: new Date(),
                    progress: 1 
                },
                { upsert: true, new: true }
            );
            return userBadge;
        } catch (error) {
            throw new Error('Error awarding badge');
        }
    }

    // Update badge progress
    static updateBadgeProgress = async (userId, badgeId, progress) => {
        try {
            const badge = await BadgeModel.findOne({ badgeId });
            if (!badge) throw new Error('Badge not found');

            const isEarned = progress >= badge.maxProgress;
            
            const userBadge = await UserBadgeModel.findOneAndUpdate(
                { userId, badgeId },
                { 
                    progress,
                    earned: isEarned,
                    earnedDate: isEarned ? new Date() : undefined
                },
                { upsert: true, new: true }
            );
            
            return userBadge;
        } catch (error) {
            throw new Error('Error updating badge progress');
        }
    }

    // Initialize default badges
    static initializeDefaultBadges = async () => {
        try {
            const defaultBadges = [
                // CROP MANAGEMENT BADGES
                {
                    badgeId: 'first_crop',
                    name: 'First Harvest',
                    description: 'Successfully harvest your first crop',
                    category: 'crop_management',
                    rarity: 'common',
                    criteria: 'Complete your first crop harvest',
                    maxProgress: 1
                },
                {
                    badgeId: 'cereal_farmer',
                    name: 'Cereal Cultivator',
                    description: 'Successfully grow 5 different cereal crops (wheat, rice, corn, etc.)',
                    category: 'crop_management',
                    rarity: 'rare',
                    criteria: 'Grow 5 different cereal crops',
                    maxProgress: 5
                },
                {
                    badgeId: 'vegetable_master',
                    name: 'Vegetable Master',
                    description: 'Successfully cultivate 10 different vegetable varieties',
                    category: 'crop_management',
                    rarity: 'epic',
                    criteria: 'Grow 10 different vegetables',
                    maxProgress: 10
                },
                {
                    badgeId: 'fruit_orchardist',
                    name: 'Orchard Keeper',
                    description: 'Successfully manage fruit trees and harvest 3 different fruits',
                    category: 'crop_management',
                    rarity: 'rare',
                    criteria: 'Harvest 3 different fruit varieties',
                    maxProgress: 3
                },
                {
                    badgeId: 'crop_rotation_expert',
                    name: 'Rotation Expert',
                    description: 'Successfully implement crop rotation for 3 complete seasons',
                    category: 'crop_management',
                    rarity: 'epic',
                    criteria: 'Complete 3 seasons of crop rotation',
                    maxProgress: 3
                },

                // SOIL EXPERTISE BADGES
                {
                    badgeId: 'clay_soil_specialist',
                    name: 'Clay Soil Specialist',
                    description: 'Master farming techniques for clay soil conditions',
                    category: 'soil_expertise',
                    rarity: 'rare',
                    criteria: 'Successfully grow crops in clay soil for 2 seasons',
                    maxProgress: 2
                },
                {
                    badgeId: 'sandy_soil_expert',
                    name: 'Sandy Soil Expert',
                    description: 'Expert in managing sandy soil challenges',
                    category: 'soil_expertise',
                    rarity: 'rare',
                    criteria: 'Successfully grow crops in sandy soil for 2 seasons',
                    maxProgress: 2
                },
                {
                    badgeId: 'loam_soil_master',
                    name: 'Loam Soil Master',
                    description: 'Optimize farming in ideal loam soil conditions',
                    category: 'soil_expertise',
                    rarity: 'common',
                    criteria: 'Successfully grow crops in loam soil',
                    maxProgress: 1
                },
                {
                    badgeId: 'soil_ph_balancer',
                    name: 'pH Balancer',
                    description: 'Successfully manage and adjust soil pH for optimal crop growth',
                    category: 'soil_expertise',
                    rarity: 'epic',
                    criteria: 'Balance soil pH for 5 different crops',
                    maxProgress: 5
                },
                {
                    badgeId: 'compost_creator',
                    name: 'Compost Creator',
                    description: 'Create and use compost to improve soil health',
                    category: 'soil_expertise',
                    rarity: 'rare',
                    criteria: 'Successfully create and use compost',
                    maxProgress: 1
                },

                // SEASONAL FARMING BADGES
                {
                    badgeId: 'monsoon_farmer',
                    name: 'Monsoon Master',
                    description: 'Successfully manage crops during monsoon season',
                    category: 'seasonal_farming',
                    rarity: 'rare',
                    criteria: 'Complete 2 successful monsoon seasons',
                    maxProgress: 2
                },
                {
                    badgeId: 'winter_grower',
                    name: 'Winter Warrior',
                    description: 'Successfully grow winter crops',
                    category: 'seasonal_farming',
                    rarity: 'common',
                    criteria: 'Successfully harvest winter crops',
                    maxProgress: 1
                },
                {
                    badgeId: 'summer_survivor',
                    name: 'Summer Survivor',
                    description: 'Manage crops through challenging summer conditions',
                    category: 'seasonal_farming',
                    rarity: 'rare',
                    criteria: 'Successfully grow summer crops with water management',
                    maxProgress: 1
                },
                {
                    badgeId: 'year_round_farmer',
                    name: 'Year-Round Farmer',
                    description: 'Successfully farm throughout all four seasons',
                    category: 'seasonal_farming',
                    rarity: 'legendary',
                    criteria: 'Complete successful harvests in all 4 seasons',
                    maxProgress: 4
                },

                // SUSTAINABLE FARMING BADGES
                {
                    badgeId: 'organic_pioneer',
                    name: 'Organic Pioneer',
                    description: 'Successfully practice organic farming methods',
                    category: 'sustainable_farming',
                    rarity: 'epic',
                    criteria: 'Grow 5 crops using only organic methods',
                    maxProgress: 5
                },
                {
                    badgeId: 'water_saver',
                    name: 'Water Conservation Champion',
                    description: 'Implement water-saving irrigation techniques',
                    category: 'sustainable_farming',
                    rarity: 'rare',
                    criteria: 'Use drip irrigation or rainwater harvesting',
                    maxProgress: 1
                },
                {
                    badgeId: 'pesticide_free',
                    name: 'Pesticide-Free Guardian',
                    description: 'Successfully farm without harmful pesticides',
                    category: 'sustainable_farming',
                    rarity: 'epic',
                    criteria: 'Complete 3 seasons without chemical pesticides',
                    maxProgress: 3
                },
                {
                    badgeId: 'biodiversity_protector',
                    name: 'Biodiversity Protector',
                    description: 'Maintain diverse ecosystem on your farm',
                    category: 'sustainable_farming',
                    rarity: 'legendary',
                    criteria: 'Grow 15+ different crop varieties while supporting local wildlife',
                    maxProgress: 15
                },

                // COMMUNITY HELPER BADGES
                {
                    badgeId: 'helpful_neighbor',
                    name: 'Helpful Neighbor',
                    description: 'Help fellow farmers solve their problems',
                    category: 'community_helper',
                    rarity: 'common',
                    criteria: 'Provide solutions to 5 farming problems',
                    maxProgress: 5
                },
                {
                    badgeId: 'problem_solver',
                    name: 'Problem Solver',
                    description: 'Expert at diagnosing and solving crop issues',
                    category: 'community_helper',
                    rarity: 'rare',
                    criteria: 'Successfully help diagnose 15 crop problems',
                    maxProgress: 15
                },
                {
                    badgeId: 'community_leader',
                    name: 'Community Leader',
                    description: 'Lead and organize farming community initiatives',
                    category: 'community_helper',
                    rarity: 'epic',
                    criteria: 'Help 50+ farmers and lead community projects',
                    maxProgress: 50
                },
                {
                    badgeId: 'mentor',
                    name: 'Farming Mentor',
                    description: 'Guide new farmers to success',
                    category: 'community_helper',
                    rarity: 'legendary',
                    criteria: 'Successfully mentor 10 new farmers',
                    maxProgress: 10
                },

                // KNOWLEDGE SHARING BADGES
                {
                    badgeId: 'knowledge_sharer',
                    name: 'Knowledge Sharer',
                    description: 'Share valuable farming knowledge with the community',
                    category: 'knowledge_sharing',
                    rarity: 'common',
                    criteria: 'Share 10 helpful farming tips or experiences',
                    maxProgress: 10
                },
                {
                    badgeId: 'tutorial_creator',
                    name: 'Tutorial Creator',
                    description: 'Create educational content for other farmers',
                    category: 'knowledge_sharing',
                    rarity: 'rare',
                    criteria: 'Create 5 detailed farming tutorials or guides',
                    maxProgress: 5
                },
                {
                    badgeId: 'research_contributor',
                    name: 'Research Contributor',
                    description: 'Contribute to agricultural research and innovation',
                    category: 'knowledge_sharing',
                    rarity: 'epic',
                    criteria: 'Document and share research on farming techniques',
                    maxProgress: 1
                },

                // INNOVATION BADGES
                {
                    badgeId: 'tech_adopter',
                    name: 'Tech Adopter',
                    description: 'Successfully implement modern farming technology',
                    category: 'innovation',
                    rarity: 'rare',
                    criteria: 'Use GPS, drones, or smart farming tools',
                    maxProgress: 1
                },
                {
                    badgeId: 'innovator',
                    name: 'Farming Innovator',
                    description: 'Develop new farming techniques or solutions',
                    category: 'innovation',
                    rarity: 'legendary',
                    criteria: 'Create and implement innovative farming solution',
                    maxProgress: 1
                },

                // ACHIEVEMENT BADGES
                {
                    badgeId: 'high_yield',
                    name: 'High Yield Champion',
                    description: 'Achieve exceptional crop yields',
                    category: 'achievement',
                    rarity: 'epic',
                    criteria: 'Achieve 120%+ of expected yield for 3 crops',
                    maxProgress: 3
                },
                {
                    badgeId: 'efficiency_expert',
                    name: 'Efficiency Expert',
                    description: 'Maximize farming efficiency and resource utilization',
                    category: 'achievement',
                    rarity: 'rare',
                    criteria: 'Achieve optimal resource use efficiency',
                    maxProgress: 1
                },
                {
                    badgeId: 'consistency_king',
                    name: 'Consistency Champion',
                    description: 'Maintain consistent quality and yields over time',
                    category: 'achievement',
                    rarity: 'epic',
                    criteria: 'Maintain consistent harvests for 5 consecutive seasons',
                    maxProgress: 5
                },

                // SPECIALIST BADGES
                {
                    badgeId: 'rice_specialist',
                    name: 'Rice Cultivation Expert',
                    description: 'Master the art of rice cultivation',
                    category: 'specialist',
                    rarity: 'epic',
                    criteria: 'Successfully grow rice for 3 seasons with high yield',
                    maxProgress: 3
                },
                {
                    badgeId: 'wheat_master',
                    name: 'Wheat Master',
                    description: 'Expert in wheat cultivation and management',
                    category: 'specialist',
                    rarity: 'epic',
                    criteria: 'Successfully grow wheat with optimal yield',
                    maxProgress: 1
                },
                {
                    badgeId: 'cotton_expert',
                    name: 'Cotton Cultivation Expert',
                    description: 'Specialist in cotton farming techniques',
                    category: 'specialist',
                    rarity: 'rare',
                    criteria: 'Successfully grow high-quality cotton',
                    maxProgress: 1
                },
                {
                    badgeId: 'spice_grower',
                    name: 'Spice Master',
                    description: 'Expert in growing various spices and herbs',
                    category: 'specialist',
                    rarity: 'rare',
                    criteria: 'Successfully grow 5 different spices',
                    maxProgress: 5
                }
            ];

            for (const badge of defaultBadges) {
                await BadgeModel.findOneAndUpdate(
                    { badgeId: badge.badgeId },
                    badge,
                    { upsert: true }
                );
            }
            
            return { message: 'Default farming badges initialized successfully' };
        } catch (error) {
            throw new Error('Error initializing badges');
        }
    }
}

module.exports = BadgeService;
