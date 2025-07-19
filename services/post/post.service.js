const postsModel = require('../../models/post/post.model');
const commentService = require('../comment/comment.service');
const likeService = require('../like/like.service');
const userService = require('../user/user.service');

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
            const data = posts.map(post => {
                const comments = commentService.getCommentsByPostId(post._id);
                const likesCount = likeService.getLikesCountByPostId(post._id);
                const userDetails = userService.getUserById(post.userId);
                if (!userDetails) {
                    throw new Error('User not found');
                }
                post.user = {
                    name: userDetails.name,
                    avatar: userDetails.avatar,
                    level: userDetails.level
                };
                return {
                    ...post.toObject(),
                    comments: comments,
                    likesCount: likesCount,
                    user: {
                        name: userDetails.name,
                        avatar: userDetails.avatar,
                        level: userDetails.level
                    }
                };
            });
            return posts;
        } catch (error) {
            throw new Error('Error fetching posts');
        }
    }
    static  getUserNameAndAvtarAndLevel = async (userId) => {
        try {
            const user = await postsModel.findById(userId).select('name avatar level');
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw new Error('Error fetching user details');
        }
    }

}

module.exports = PostsService;
