import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { listingService } from "../services/listingService";
import SearchBar from "../components/SearchBar";
import toast from "react-hot-toast";
import "./Listings.css";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    category: '',
    sortBy: 'newest'
  });

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

  // Filter and search logic
  const filteredListings = useMemo(() => {
    let result = [...listings];

    // Search by title, description, location, or country
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(listing => 
        listing.title.toLowerCase().includes(query) ||
        listing.description?.toLowerCase().includes(query) ||
        listing.location.toLowerCase().includes(query) ||
        listing.country.toLowerCase().includes(query)
      );
    }

    // Filter by location
    if (filters.location) {
      const location = filters.location.toLowerCase();
      result = result.filter(listing =>
        listing.location.toLowerCase().includes(location) ||
        listing.country.toLowerCase().includes(location)
      );
    }

    // Filter by price range
    if (filters.minPrice) {
      result = result.filter(listing => listing.price >= Number(filters.minPrice));
    }
    if (filters.maxPrice) {
      result = result.filter(listing => listing.price <= Number(filters.maxPrice));
    }

    // Filter by category (check if title or description contains category)
    if (filters.category) {
      const category = filters.category.toLowerCase();
      result = result.filter(listing =>
        listing.title.toLowerCase().includes(category) ||
        listing.description?.toLowerCase().includes(category)
      );
    }

    // Sort listings
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        break;
    }

    return result;
  }, [listings, searchQuery, filters]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading listings...</p>
      </div>
    );
  }

  return (
    <>
      <SearchBar 
        onSearch={setSearchQuery}
        onFilterChange={setFilters}
      />
      
      <div className="listings-container">
        <div className="container">
          <div className="listings-header">
            <h1 className="page-title">
              {searchQuery || filters.location || filters.category ? 
                `Search Results (${filteredListings.length})` : 
                'All Listings'}
            </h1>
            <p className="listings-count">
              Showing {filteredListings.length} of {listings.length} listings
            </p>
          </div>

        {filteredListings.length === 0 ? (
          <div className="empty-state">
            <i className="fa-solid fa-house-circle-xmark"></i>
            <h3>No listings found</h3>
            <p>
              {searchQuery || filters.location || filters.category ? 
                'Try adjusting your search or filters' : 
                'Be the first to create a listing!'}
            </p>
            {!searchQuery && !filters.location && !filters.category && (
              <Link to="/listings/new" className="btn btn-primary">
                Create Listing
              </Link>
            )}
          </div>
        ) : (
          <div className="listings-grid">
            {filteredListings.map((listing) => (
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
    </>
  );
};

export default Listings;
