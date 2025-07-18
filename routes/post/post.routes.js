const postController = require("../../controllers/post/post.controller");
const upload = require("../../config/multer");
const multer = require("multer");
const express = require("express");
const router = express.Router();

router.post("/register", upload.single("image"), postController.registerPost);
router.get("/getAllPosts", postController.getAllPosts);
router.delete("/deletePost/:id", postController.deletePost);
router.get("/getPostById/:id", postController.getPostById);
router.put("/updatePost/:id", upload.single("image"), postController.updatePost);

module.exports = router;