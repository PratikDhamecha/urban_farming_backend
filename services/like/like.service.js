const likeModel = require('../../models/like/like.model');

class LikeService {
    static createLike = async (likeData) => {
        try {
            const newLike = new likeModel(likeData);
            await newLike.save();
            return { message: 'Like created successfully', like: newLike };
        } catch (error) {
            throw new Error('Error creating like');
        }
    }

    static getLikesCountByPostId = async (postId) => {
        try {
            const likeCount = await likeModel.countDocuments({ postId });
            return likeCount;
        } catch (error) {
            throw new Error('Error fetching likes');
        }
    }
}

module.exports = LikeService;