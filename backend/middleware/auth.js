const passport = require("passport");
const jwt = require("jsonwebtoken");

// Middleware to protect routes - requires valid JWT token
const authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please login to access this resource.",
      });
    }
    
    // Attach user to request object
    req.user = user;
    next();
  })(req, res, next);
};

// Middleware to check if user is the owner of a resource
const isOwner = (Model) => {
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const resource = await Model.findById(id);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: "Resource not found",
        });
      }

      // Check if current user is the owner
      if (!resource.owner.equals(req.user._id)) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to perform this action",
        });
      }

      // Attach resource to request for use in controller
      req.resource = resource;
      next();
    } catch (error) {
      next(error);
    }
  };
};

// Middleware to check if user is the author of a review
const isReviewAuthor = (Model) => {
  return async (req, res, next) => {
    try {
      const { reviewId } = req.params;
      const review = await Model.findById(reviewId);

      if (!review) {
        return res.status(404).json({
          success: false,
          message: "Review not found",
        });
      }

      // Check if current user is the author
      if (!review.author.equals(req.user._id)) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to perform this action",
        });
      }

      req.review = review;
      next();
    } catch (error) {
      next(error);
    }
  };
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || "your-secret-key-change-in-production",
    { expiresIn: "7d" } // Token expires in 7 days
  );
};

module.exports = {
  authenticate,
  isOwner,
  isReviewAuthor,
  generateToken,
};
