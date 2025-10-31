const Listing = require("../models/listing.model");
const { AppError } = require("../middleware/errorHandler");

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
exports.getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find({})
      .populate("owner", "username")
      .sort({ createdAt: -1 }); // Sort by newest first

    res.json({
      success: true,
      count: listings.length,
      data: { listings },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single listing by ID
// @route   GET /api/listings/:id
// @access  Public
exports.getListing = async (req, res, next) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id)
      .populate("owner", "username email")
      .populate({
        path: "reviews",
        populate: {
          path: "author",
          select: "username",
        },
      });

    if (!listing) {
      throw new AppError(404, "Listing not found");
    }

    res.json({
      success: true,
      data: { listing },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new listing
// @route   POST /api/listings
// @access  Private
exports.createListing = async (req, res, next) => {
  try {
    const { title, description, location, country, price, image } = req.body;

    // Create listing object
    const listingData = {
      title,
      description,
      location,
      country,
      price,
      owner: req.user._id,
    };

    // Add image if uploaded via file
    if (req.file) {
      listingData.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    } 
    // Add image if provided in body (for seeding)
    else if (image) {
      listingData.image = image;
    }

    const listing = new Listing(listingData);
    await listing.save();

    // Populate owner information
    await listing.populate("owner", "username");

    res.status(201).json({
      success: true,
      message: "Listing created successfully",
      data: { listing },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update listing
// @route   PUT /api/listings/:id
// @access  Private (Owner only)
exports.updateListing = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, location, country, price } = req.body;

    const listing = await Listing.findById(id);

    if (!listing) {
      throw new AppError(404, "Listing not found");
    }

    // Check ownership
    if (!listing.owner.equals(req.user._id)) {
      throw new AppError(403, "You are not authorized to update this listing");
    }

    // Update fields
    listing.title = title || listing.title;
    listing.description = description || listing.description;
    listing.location = location || listing.location;
    listing.country = country || listing.country;
    listing.price = price !== undefined ? price : listing.price;

    // Update image if new one is uploaded
    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    await listing.save();
    await listing.populate("owner", "username");

    res.json({
      success: true,
      message: "Listing updated successfully",
      data: { listing },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete listing
// @route   DELETE /api/listings/:id
// @access  Private (Owner only)
exports.deleteListing = async (req, res, next) => {
  try {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      throw new AppError(404, "Listing not found");
    }

    // Check ownership
    if (!listing.owner.equals(req.user._id)) {
      throw new AppError(403, "You are not authorized to delete this listing");
    }

    await Listing.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
