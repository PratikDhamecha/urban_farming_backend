const BadgeService = require('../../services/badge/badge.service');

class BadgeController {
    // Get all available badges
    static getAllBadges = async (req, res) => {
        try {
            const badges = await BadgeService.getAllBadges();
            res.status(200).json({
                success: true,
                data: badges
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Get user badges
    static getUserBadges = async (req, res) => {
        try {
            const { userId } = req.params;
            const badges = await BadgeService.getUserBadges(userId);

            console.log(`User ${userId} badges:`, badges);
            
            res.status(200).json({
                success: true,
                data: badges
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // Award badge to user
    static awardBadge = async (req, res) => {
        try {
            const { userId } = req.params;
            const { badgeId } = req.body;
            const result = await BadgeService.awardBadge(userId, badgeId);
            res.status(200).json({
                success: true,
                data: result,
                message: 'Badge awarded successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Initialize default badges
    static initializeBadges = async (req, res) => {
        try {
            const result = await BadgeService.initializeDefaultBadges();
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = BadgeController;
