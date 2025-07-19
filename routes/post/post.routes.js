const postController = require("../../controllers/post/post.controller");
const upload = require("../../middleware/multer.middleware");
const express = require("express");
const router = express.Router();
const verifyToken = require("../../middleware/middleware");

router.post("/addPost", upload.single("image"),verifyToken,postController.createPost);
router.get("/getAllPosts",verifyToken, postController.getAllPosts);
router.delete("/deletePost/:id",verifyToken, postController.deletePost);
router.get("/getPostById/:id",verifyToken, postController.getPostById);

module.exports = router;