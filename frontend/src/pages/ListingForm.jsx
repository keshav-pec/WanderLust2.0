import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listingService } from "../services/listingService";
import toast from "react-hot-toast";
import "./ListingForm.css";

const ListingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    country: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      fetchListing();
    }
  }, [id]);

  const fetchListing = async () => {
    try {
      const data = await listingService.getListing(id);
      const listing = data.data.listing;
      setFormData({
        title: listing.title,
        description: listing.description,
        location: listing.location,
        country: listing.country,
        price: listing.price,
      });
      setImagePreview(listing.image.url);
    } catch (error) {
      toast.error("Failed to fetch listing");
      navigate("/");
    } finally {
      setFetchingData(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("location", formData.location);
      submitData.append("country", formData.country);
      submitData.append("price", formData.price);
      
      if (image) {
        submitData.append("image", image);
      }

      if (isEditMode) {
        await listingService.updateListing(id, submitData);
        toast.success("Listing updated successfully");
      } else {
        await listingService.createListing(submitData);
        toast.success("Listing created successfully");
      }

      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        `Failed to ${isEditMode ? "update" : "create"} listing`;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading listing...</p>
      </div>
    );
  }

  return (
    <div className="listing-form-container">
      <div className="container">
        <div className="form-card">
          <h1 className="form-title">
            {isEditMode ? "Edit Listing" : "Create New Listing"}
          </h1>

          <form onSubmit={handleSubmit} className="listing-form">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Beach House in Goa"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Describe your property..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  placeholder="Calangute"
                />
              </div>

              <div className="form-group">
                <label htmlFor="country">Country *</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  placeholder="India"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price per night (₹) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                placeholder="5000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">
                Image {!isEditMode && "*"}
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                required={!isEditMode}
              />
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading
                  ? isEditMode
                    ? "Updating..."
                    : "Creating..."
                  : isEditMode
                  ? "Update Listing"
                  : "Create Listing"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ListingForm;
