const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");
const { authenticate } = require("../middleware/auth");
const { validateReview } = require("../middleware/validation");

// Public routes - listing ID comes from query/body
router.get("/listing/:listingId", reviewController.getReviews);

// Protected routes (require authentication)
router.post("/listing/:listingId", authenticate, validateReview, reviewController.createReview);

router.put("/:reviewId", authenticate, validateReview, reviewController.updateReview);

router.delete("/:reviewId", authenticate, reviewController.deleteReview);

module.exports = router;
