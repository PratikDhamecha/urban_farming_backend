const postController = require("../../controllers/post/post.controller");
const upload = require("../../middleware/multer.middleware");
const express = require("express");
const router = express.Router();

router.post("/register", upload.single("image"), postController.createPost);
router.get("/getAllPosts", postController.getAllPosts);
router.delete("/deletePost/:id", postController.deletePost);
router.get("/getPostById/:id", postController.getPostById);

module.exports = router;