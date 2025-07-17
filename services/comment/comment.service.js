const commentModel = require('../../models/comment/comment.model');

class CommentService {
    static createComment = async (commentData) => {
        try {
            const newComment = new commentModel(commentData);
            await newComment.save();
            return { message: 'Comment created successfully', comment: newComment };
        } catch (error) {
            throw new Error('Error creating comment');
        }
    }

    static getCommentById = async (commentId) => {
        try {
            const comment = await commentModel.findById(commentId);
            if (!comment) {
                throw new Error('Comment not found');
            }
            return comment;
        } catch (error) {
            throw new Error('Error fetching comment');
        }
    }

    static updateComment = async (commentId, updateData) => {
        try {
            const comment = await commentModel.findByIdAndUpdate(commentId, updateData, { new: true });
            if (!comment) {
                throw new Error('Comment not found');
            }
            return comment;
        } catch (error) {
            throw new Error('Error updating comment');
        }
    }

    static deleteComment = async (commentId) => {
        try {
            const comment = await commentModel.findByIdAndDelete(commentId);
            if (!comment) {
                throw new Error('Comment not found');
            }
            return { message: 'Comment deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting comment');
        }
    }

    static getAllComments = async () => {
        try {
            const comments = await commentModel.find();
            return comments;
        } catch (error) {
            throw new Error('Error fetching comments');
        }
    }
}

module.exports = CommentService;
// This service handles CRUD operations for comments.