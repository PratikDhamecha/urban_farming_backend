const postService = require("../../services/post/post.service");
const commentService = require("../../services/comment/comment.service");
const uploadImage = require("../../services/cloudinary/clodinary.service");
require("dotenv").config();

class PostController {
    static createPost = async (req, res) => {
        try{
            const post = req.body;
            if(req.file){
                // If an image was uploaded, set the image URL
                post.imageUrl.push(await uploadImage(req.file.path));
            }
            const newPost = await postService.createPost(post);
            return res.status(200).json(newPost);
        }catch(error){
            res.status(500).json({error:error});
        }
    }

    static getAllPosts = async (req, res) => {
        try{
            let posts = await postService.getAllPosts();
            res.json({status: true, success: "Posts fetched successfully", data: posts});
        }catch(error){
            res.status(500).json({ message: error.message });
        }
    }
    static  deletePost = async (req, res) => {
        try{
            const postId = req.params.id;
            const post = await postService.deletePost(postId);
            res.json({status: true, success: "Post deleted successfully", data: post});
        }catch (error){
            res.status(500).json({error:error});
        }
    }
    static getPostById = async (req, res) => {
        try {
            const postId = req.params.id;
            const post = await postService.getPostById(postId);
            res.json({status: true, success: "Post fetched successfully", data: post});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = PostController;
