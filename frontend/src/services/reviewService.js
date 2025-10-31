import api from "./api";

// Review services
export const reviewService = {
  // Get all reviews for a listing
  getReviews: async (listingId) => {
    const response = await api.get(`/reviews/listing/${listingId}`);
    return response.data;
  },

  // Create a review
  createReview: async (listingId, reviewData) => {
    const response = await api.post(
      `/reviews/listing/${listingId}`,
      reviewData
    );
    return response.data;
  },

  // Update a review
  updateReview: async (reviewId, reviewData) => {
    const response = await api.put(
      `/reviews/${reviewId}`,
      reviewData
    );
    return response.data;
  },

  // Delete a review
  deleteReview: async (reviewId) => {
    const response = await api.delete(
      `/reviews/${reviewId}`
    );
    return response.data;
  },
};
