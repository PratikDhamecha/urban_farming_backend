const CommentController = require('../../controllers/comment/comment.controller');
const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/middleware');

router.post("/addComment", verifyToken, CommentController.createComment);
router.get("/getCommentsByPostId/:postId", verifyToken, CommentController.getCommentsByPostId);
router.get("/getCommentById/:commentId", verifyToken, CommentController.getCommentById);
router.get("/getCommentsCountByPostId/:postId", verifyToken, CommentController.getCommentsCountByPostId);
router.delete("/deleteComment/:commentId", verifyToken, CommentController.deleteComment);

module.exports = router;