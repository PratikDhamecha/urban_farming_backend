const likeService = require('../../services/likes/likes.service');

class LikeController {
    static async createLike(req, res) {
        try {
            const likeData = req.body;
            const newLike = await likeService.createLike(likeData);
            res.status(201).json({
                success: true,
                message: 'Like created successfully',
                data: newLike
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    static async updateLike(req, res) {
        try {
            const likeId = req.params.id;
            const likeData = req.body;
            const updatedLike = await likeService.updateLike(likeId, likeData);
            res.status(200).json({
                success: true,
                message: 'Like updated successfully',
                data: updatedLike
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
    static async getLikesCountByPostId(req, res) {
        try {
            const postId = req.params.postId;
            const likeCount = await likeService.getLikesCountByPostId(postId);
            res.status(200).json({
                success: true,
                message: 'Likes count fetched successfully',
                data: { count: likeCount }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}