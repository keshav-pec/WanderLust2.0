import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { listingService } from "../services/listingService";
import { reviewService } from "../services/reviewService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./ListingDetail.css";

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const data = await listingService.getListing(id);
      setListing(data.data.listing);
    } catch (error) {
      toast.error("Failed to fetch listing");
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?")) {
      return;
    }

    try {
      await listingService.deleteListing(id);
      toast.success("Listing deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete listing");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await reviewService.createReview(id, reviewForm);
      toast.success("Review submitted successfully");
      setReviewForm({ rating: 5, comment: "" });
      fetchListing(); // Refresh to show new review
    } catch (error) {
      const message = error.response?.data?.message || "Failed to submit review";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      await reviewService.deleteReview(reviewId);
      toast.success("Review deleted successfully");
      fetchListing(); // Refresh listing
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading listing...</p>
      </div>
    );
  }

  if (!listing) {
    return null;
  }

  const isOwner = user && listing.owner._id === user.id;

  return (
    <div className="listing-detail-container">
      <div className="container">
        <div className="listing-detail">
          <div className="listing-header">
            <h1>{listing.title}</h1>
            <p className="listing-owner">
              <i className="fa-solid fa-user"></i>
              Hosted by <strong>{listing.owner.username}</strong>
            </p>
          </div>

          <div className="listing-image-large">
            <img src={listing.image.url} alt={listing.title} />
          </div>

          <div className="listing-info">
            <div className="info-section">
              <h2>Description</h2>
              <p>{listing.description}</p>
            </div>

            <div className="info-section">
              <h2>Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <i className="fa-solid fa-location-dot"></i>
                  <div>
                    <strong>Location</strong>
                    <p>{listing.location}</p>
                  </div>
                </div>
                <div className="detail-item">
                  <i className="fa-solid fa-earth-americas"></i>
                  <div>
                    <strong>Country</strong>
                    <p>{listing.country}</p>
                  </div>
                </div>
                <div className="detail-item">
                  <i className="fa-solid fa-indian-rupee-sign"></i>
                  <div>
                    <strong>Price per night</strong>
                    <p>₹{listing.price.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              </div>
            </div>

            {isOwner && (
              <div className="owner-actions">
                <Link to={`/listings/${id}/edit`} className="btn btn-primary">
                  <i className="fa-solid fa-edit"></i> Edit Listing
                </Link>
                <button onClick={handleDelete} className="btn btn-danger">
                  <i className="fa-solid fa-trash"></i> Delete Listing
                </button>
              </div>
            )}
          </div>

          {/* Reviews Section */}
          <div className="reviews-section">
            <h2>Reviews</h2>

            {isAuthenticated && (
              <form onSubmit={handleReviewSubmit} className="review-form">
                <h3>Leave a Review</h3>
                <div className="form-group">
                  <label>Rating</label>
                  <div className="star-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${reviewForm.rating >= star ? "active" : ""}`}
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label>Comment</label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, comment: e.target.value })
                    }
                    required
                    rows={4}
                    placeholder="Share your experience..."
                  />
                </div>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            )}

            <div className="reviews-list">
              {listing.reviews && listing.reviews.length > 0 ? (
                listing.reviews.map((review) => (
                  <div key={review._id} className="review-card">
                    <div className="review-header">
                      <div>
                        <strong>@{review.author.username}</strong>
                        <div className="review-rating">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </div>
                      </div>
                      {user && review.author._id === user.id && (
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="btn-delete-review"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      )}
                    </div>
                    <p className="review-comment">{review.comment}</p>
                    <p className="review-date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="no-reviews">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;
