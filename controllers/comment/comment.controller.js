const commentService = require('../../services/comment/comment.service');

exports.createComment = async (req, res) => {
    try{
        const { postId, userId, content } = req.body;

        if (!postId || !content) {
            return res.status(400).json({ message: 'Post ID and content are required' });
        }

        const newComment = await commentService.createComment({ postId, userId, content });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error: error.message });
    }
}

exports.getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required' });
        }

        const comments = await commentService.getCommentsByPostId(postId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
}

exports.getCommentsCountByPostId = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required' });
        }

        const count = await commentService.getCommentsCountByPostId(postId);
        res.status(200).json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments count', error: error.message });
    }
}

module.exports = exports;