// Service to fetch admin dashboard statistics
const User = require("../../models/user/user.model");
const Post = require("../../models/post/post.model");
const Comment = require("../../models/comment/comment.model");
const Like = require("../../models/like/like.model");
const Badge = require("../../models/badge/badge.model");
const WateringLog = require("../../models/wateringLog/wateringLog.model");

const getDashboardStats = async () => {
  const [
    totalUsers,
    totalPosts,
    totalComments,
    totalLikes,
    totalBadges,
    totalWateringLogs,
    recentPosts,
    recentComments,
    recentUsers,
    userGrowthByMonth,
  ] = await Promise.all([
    User.countDocuments(),
    Post.countDocuments(),
    Comment.countDocuments(),
    Like.countDocuments(),
    Badge.countDocuments(),
    WateringLog.countDocuments(),
    Post.find().sort({ createdAt: -1 }).limit(5),
    Comment.find().sort({ createdAt: -1 }).limit(5),
    User.find().sort({ createdAt: -1 }).limit(5),
    User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  return {
    totalUsers,
    totalPosts,
    totalComments,
    totalLikes,
    totalBadges,
    totalWateringLogs,
    recentPosts,
    recentComments,
    recentUsers,
    userGrowthByMonth,
  };
};

module.exports = { getDashboardStats };
