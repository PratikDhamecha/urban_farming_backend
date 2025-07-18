const postService = require("../services/post/post.service");
require("dotenv").config();

exports.createPost = async (req, res) => {
    try {
        const post = req.body;
        const newPost = await postService.createPost(post);
        res.json({status: true, success: "Post created successfully", data: newPost});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// exports.getPostById = async (req, res) => {
//     try {
//         const postId = req.params.id;
//         const post = await postService.getPostById(postId);
//         res.json({status: true, success: "Post fetched successfully", data: post});
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
exports.getAllPosts = async (req, res) => {
    try{
        let posts = await postService.getAllPosts();
        res.json({status: true, success: "Posts fetched successfully", data: posts});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

exports.deletePost = async (req, res) => {
    try{
        const postId = req.params.id;
        const post = await postService.deletePost(postId);
        res.json({status: true, success: "Post deleted successfully", data: post});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}
