const express = require("express");
const UserController = require("../../controllers/user/user.controller");
const router = express.Router();
const verifyToken = require("../../middleware/middleware");
const upload = require("../../middleware/multer.middleware");
const verifyIsAdmin = require("../../middleware/admin.middleware");

// Auth routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

// Admin routes
router.get(
  "/admin/users",
  verifyToken,
  verifyIsAdmin,
  UserController.getAllUsers
);

// Profile routes
router.get("/profile/:userId", verifyToken, UserController.getUserProfile);
router.put("/profile/:userId", verifyToken, UserController.updateUserProfile);
router.post(
  "/profile/:userId",
  verifyToken,
  upload.single("image"),
  UserController.updateUserProfile
);
// soft delete
router.delete("/profile/:id", verifyToken, UserController.deleteUser);
// XP and stats routes
router.post("/xp/:userId", verifyToken, UserController.addXP);
router.post("/stats/:userId", verifyToken, UserController.updateUserStats);

module.exports = router;
