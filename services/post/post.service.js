const postsModel = require('../../models/post/post.model');
const commentService = require('../comment/comment.service');
const likeService = require('../like/like.service');

class PostsService {
    static createPost = async (postData) => {
        try {
            const newPost = new postsModel(postData);
            await newPost.save();
            return { message: 'Post created successfully', post: newPost };
        } catch (error) {
            throw new Error('Error creating post');
        }
    }

    static getPostById = async (postId) => {
        try {
            const post = await postsModel.findById(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            return post;
        } catch (error) {
            throw new Error('Error fetching post');
        }
    }

    static updatePost = async (postId, updateData) => {
        try {
            const post = await postsModel.findByIdAndUpdate(postId, updateData, { new: true });
            if (!post) {
                throw new Error('Post not found');
            }
            return post;
        } catch (error) {
            throw new Error('Error updating post');
        }
    }

    static deletePost = async (postId) => {
        try {
            const post = await postsModel.findByIdAndDelete(postId);
            if (!post) {
                throw new Error('Post not found');
            }
            return { message: 'Post deleted successfully' };
        } catch (error) {
            throw new Error('Error deleting post');
        }
    }

    static getAllPosts = async () => {
        try {
            const posts = await postsModel.find().populate("user",'name');
            const data = await Promise.all(posts.map(async post => {
                const comments = await commentService.getCommentsByPostId(post._id);
                const likesCount = await likeService.getLikesCountByPostId(post._id);
                const timestamp = post.createdAt.toISOString().split('T')[0];
                return {
                    ...post.toObject(),
                    comments: comments,
                    likesCount: likesCount,
                    timestamp
                };
            }));
            return posts;
        } catch (error) {
            throw new Error('Error fetching posts');
        }
    }

}

module.exports = PostsService;
// This service handles CRUD operations for posts.