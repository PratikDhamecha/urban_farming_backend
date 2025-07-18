const { init } = require('../../app');
const { initializeBadges } = require('../../controllers/badge/badge.controller');
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
}

module.exports = BadgeService;
