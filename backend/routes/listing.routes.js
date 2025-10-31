const express = require("express");
const router = express.Router();
const multer = require("multer");
const listingController = require("../controllers/listing.controller");
const { authenticate } = require("../middleware/auth");
const { validateListing } = require("../middleware/validation");
const { storage } = require("../config/cloudinary");

// Configure multer for file uploads
const upload = multer({ storage });

// Public routes
router.get("/", listingController.getAllListings);
router.get("/:id", listingController.getListing);

// Protected routes (require authentication)
router.post(
  "/",
  authenticate,
  upload.single("image"),
  validateListing,
  listingController.createListing
);

router.put(
  "/:id",
  authenticate,
  upload.single("image"),
  validateListing,
  listingController.updateListing
);

router.delete("/:id", authenticate, listingController.deleteListing);

module.exports = router;
