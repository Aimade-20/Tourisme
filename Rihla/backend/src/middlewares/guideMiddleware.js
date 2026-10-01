const guideMiddleware = (req, res, next) => {
  try {
    if (req.user.role !== "guide" || !req.user.isApproved) {
      return res.status(403).json({
        message: "Only approved guides can create activities",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = guideMiddleware;
