import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listingService } from "../services/listingService";
import toast from "react-hot-toast";
import "./Home.css";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const data = await listingService.getAllListings();
      setListings(data.data.listings);
    } catch (error) {
      toast.error("Failed to fetch listings");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading listings...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="container">
        <h1 className="page-title">All Listings</h1>

        {listings.length === 0 ? (
          <div className="empty-state">
            <i className="fa-solid fa-house-circle-xmark"></i>
            <h3>No listings found</h3>
            <p>Be the first to create a listing!</p>
            <Link to="/listings/new" className="btn btn-primary">
              Create Listing
            </Link>
          </div>
        ) : (
          <div className="listings-grid">
            {listings.map((listing) => (
              <Link
                to={`/listings/${listing._id}`}
                key={listing._id}
                className="listing-card"
              >
                <div className="listing-image">
                  <img src={listing.image.url} alt={listing.title} />
                </div>
                <div className="listing-content">
                  <h3 className="listing-title">{listing.title}</h3>
                  <p className="listing-location">
                    <i className="fa-solid fa-location-dot"></i>
                    {listing.location}, {listing.country}
                  </p>
                  <p className="listing-price">
                    ₹{listing.price.toLocaleString("en-IN")}
                    <span className="price-period">/night</span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
