const Review = require("../models/review.model");
const Listing = require("../models/listing.model");
const { AppError } = require("../middleware/errorHandler");

// @desc    Get all reviews for a listing
// @route   GET /api/reviews/listing/:listingId
// @access  Public
exports.getReviews = async (req, res, next) => {
  try {
    const { listingId } = req.params;

    const reviews = await Review.find({ listing: listingId })
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: { reviews },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a review for a listing
// @route   POST /api/reviews/listing/:listingId
// @access  Private
exports.createReview = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const { rating, comment } = req.body;

    // Check if listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      throw new AppError(404, "Listing not found");
    }

    // Check if user already reviewed this listing
    const existingReview = await Review.findOne({
      listing: listingId,
      author: req.user._id,
    });

    if (existingReview) {
      throw new AppError(400, "You have already reviewed this listing");
    }

    // Create review
    const review = new Review({
      rating,
      comment,
      author: req.user._id,
      listing: listingId,
    });

    await review.save();

    // Add review to listing
    listing.reviews.push(review._id);
    await listing.save();

    // Populate author information
    await review.populate("author", "username");

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: { review },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:reviewId
// @access  Private (Author only)
exports.updateReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) {
      throw new AppError(404, "Review not found");
    }

    // Check if user is the author
    if (!review.author.equals(req.user._id)) {
      throw new AppError(403, "You are not authorized to update this review");
    }

    // Update review
    review.rating = rating !== undefined ? rating : review.rating;
    review.comment = comment || review.comment;

    await review.save();
    await review.populate("author", "username");

    res.json({
      success: true,
      message: "Review updated successfully",
      data: { review },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:reviewId
// @access  Private (Author only)
exports.deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
      throw new AppError(404, "Review not found");
    }

    // Check if user is the author
    if (!review.author.equals(req.user._id)) {
      throw new AppError(403, "You are not authorized to delete this review");
    }

    // Remove review from listing
    await Listing.findByIdAndUpdate(review.listing, {
      $pull: { reviews: reviewId },
    });

    // Delete review
    await Review.findByIdAndDelete(reviewId);

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
