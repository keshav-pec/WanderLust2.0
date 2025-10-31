const Joi = require("joi");

// Listing validation schema
const listingSchema = Joi.object({
  title: Joi.string().required().trim().messages({
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),
  description: Joi.string().required().trim().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  location: Joi.string().required().trim().messages({
    "string.empty": "Location is required",
    "any.required": "Location is required",
  }),
  country: Joi.string().required().trim().messages({
    "string.empty": "Country is required",
    "any.required": "Country is required",
  }),
  price: Joi.number().required().min(0).messages({
    "number.base": "Price must be a number",
    "number.min": "Price must be a positive number",
    "any.required": "Price is required",
  }),
  image: Joi.object({
    url: Joi.string().allow("", null),
    filename: Joi.string().allow("", null),
  }).optional(),
});

// Review validation schema
const reviewSchema = Joi.object({
  rating: Joi.number().required().min(1).max(5).messages({
    "number.base": "Rating must be a number",
    "number.min": "Rating must be at least 1",
    "number.max": "Rating must be at most 5",
    "any.required": "Rating is required",
  }),
  comment: Joi.string().required().trim().messages({
    "string.empty": "Comment is required",
    "any.required": "Comment is required",
  }),
});

// User registration validation schema
const registerSchema = Joi.object({
  username: Joi.string().required().min(3).trim().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters long",
    "any.required": "Username is required",
  }),
  email: Joi.string().required().email().trim().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().min(6).messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

// User login validation schema
const loginSchema = Joi.object({
  username: Joi.string().required().trim().messages({
    "string.empty": "Username is required",
    "any.required": "Username is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});

// Validation middleware factory
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }
    
    next();
  };
};

module.exports = {
  validateListing: validate(listingSchema),
  validateReview: validate(reviewSchema),
  validateRegister: validate(registerSchema),
  validateLogin: validate(loginSchema),
};
