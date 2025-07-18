const UserService = require('../../services/user/user.service');

class UserController {
    // Get user profile
    static getUserProfile = async (req, res) => {
        try {
            const { userId } = req.params;
            const userProfile = await UserService.getUserProfile(userId);
            res.status(200).json({
                success: true,
                data: userProfile
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update user profile
    static updateUserProfile = async (req, res) => {
        try {
            const { userId } = req.params;
            const updateData = req.body;

            // If an image was uploaded, set the avatar URL
            if (req.file) {
                updateData.avatar = `/api/images/${req.file.filename}`;
            }

            const updatedUser = await UserService.updateUser(userId, updateData);
            res.status(200).json({
                success: true,
                data: updatedUser,
                message: 'Profile updated successfully'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Add XP to user
    static addXP = async (req, res) => {
        try {
            const { userId } = req.params;
            const { xpAmount, reason } = req.body;
            const result = await UserService.addXP(userId, xpAmount, reason);
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Update user stats
    static updateUserStats = async (req, res) => {
        try {
            const { userId } = req.params;
            const { statType, increment } = req.body;
            const user = await UserService.updateUserStats(userId, statType, increment);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Register user
    static registerUser = async (req, res) => {
        try {
            const result = await UserService.registerUser(req.body);
            res.status(201).json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    // Login user
    static loginUser = async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await UserService.loginUser(email, password);
            res.status(200).json({
                success: true,
                data: result
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = UserController;
