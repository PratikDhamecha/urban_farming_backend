const commentController = require('../../controllers/comments/comment.controller');
const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/middleware');

router.post("/register", verifyToken, commentController.createComment);
router.get("/getCommentsByPostId/:postId", verifyToken, commentController.getCommentsByPostId);
router.get("/getCommentsCountByPostId/:postId", verifyToken, commentController.getCommentsCountByPostId);
router.delete("/deleteComment/:commentId", verifyToken, commentController.deleteComment);

module.exports = router;