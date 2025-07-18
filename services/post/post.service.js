const postsModel = require('../../models/post/post.model');

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
            return posts;
        } catch (error) {
            throw new Error('Error fetching posts');
        }
    }

}

module.exports = PostsService;
// This service handles CRUD operations for posts.