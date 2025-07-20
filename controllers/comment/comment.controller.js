const commentService = require('../../services/comment/comment.service');
const UserController = require("../user/user.controller");

class CommentController {
    static createComment = async (req, res) => {
        try{
            const { postId, userId, content } = req.body;

            if (!postId || !content) {
                return res.status(400).json({ message: 'Post ID and content are required' });
            }

            const newComment = await commentService.createComment({ postId, userId, content });
            res.status(201).json(newComment);
        }catch (error) {
            res.status(500).json({ message: 'Error creating comment', error: error.message });
        }
    }
    static getCommentsByPostId = async (req, res) => {
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
    static getCommentsCountByPostId = async (req, res) => {
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
    static deleteComment = async (req, res) => {
        try {
            const { commentId } = req.params;

            if (!commentId) {
                return res.status(400).json({ message: 'Comment ID is required' });
            }

            const deletedComment = await commentService.deleteComment(commentId);
            if (!deletedComment) {
                return res.status(404).json({ message: 'Comment not found' });
            }

            res.status(200).json({ message: 'Comment deleted successfully', data: deletedComment });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting comment', error: error.message });
        }
    }
}
module.exports = CommentController;
