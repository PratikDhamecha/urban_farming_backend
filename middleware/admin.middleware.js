const verifyIsAdmin = (req, res, next) => {
  const isAdmin = req.user?.isAdmin;

  if (!isAdmin) {
    return res
      .status(401)
      .json({ message: "Access denied. Only Admin is allowed." });
  }

  next();
};

module.exports = verifyIsAdmin;
