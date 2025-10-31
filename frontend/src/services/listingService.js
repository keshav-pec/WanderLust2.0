import api from "./api";

// Listing services
export const listingService = {
  // Get all listings
  getAllListings: async () => {
    const response = await api.get("/listings");
    return response.data;
  },

  // Get single listing by ID
  getListing: async (id) => {
    const response = await api.get(`/listings/${id}`);
    return response.data;
  },

  // Create new listing
  createListing: async (formData) => {
    const response = await api.post("/listings", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Update listing
  updateListing: async (id, formData) => {
    const response = await api.put(`/listings/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Delete listing
  deleteListing: async (id) => {
    const response = await api.delete(`/listings/${id}`);
    return response.data;
  },
};
