import { useState, useEffect } from 'react';
import { Search, MapPin, DollarSign, Home, Filter, X } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    category: '',
    sortBy: 'newest'
  });

  const categories = [
    'Beach', 'Mountain', 'City', 'Countryside', 'Lake', 'Desert', 
    'Island', 'Historic', 'Modern', 'Luxury', 'Budget-Friendly'
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' }
  ];

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchQuery);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  // Apply filters
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      category: '',
      sortBy: 'newest'
    });
    setSearchQuery('');
  };

  const hasActiveFilters = () => {
    return filters.location || filters.minPrice || filters.maxPrice || 
           filters.category || filters.sortBy !== 'newest' || searchQuery;
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar-wrapper">
        {/* Main Search Bar */}
        <div className="main-search-bar">
          <div className="search-input-group">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search destinations, cities, countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button 
            className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            <span>Filters</span>
            {hasActiveFilters() && <span className="filter-badge"></span>}
          </button>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filters-header">
              <h3>Filter Results</h3>
              {hasActiveFilters() && (
                <button className="clear-all-btn" onClick={clearFilters}>
                  Clear All
                </button>
              )}
            </div>

            <div className="filters-grid">
              {/* Location Filter */}
              <div className="filter-group">
                <label className="filter-label">
                  <MapPin size={16} />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter location..."
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="filter-input"
                />
              </div>

              {/* Price Range Filter */}
              <div className="filter-group">
                <label className="filter-label">
                  <DollarSign size={16} />
                  Price Range
                </label>
                <div className="price-range-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="filter-input price-input"
                    min="0"
                  />
                  <span className="price-separator">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="filter-input price-input"
                    min="0"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="filter-group">
                <label className="filter-label">
                  <Home size={16} />
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Sort By Filter */}
              <div className="filter-group">
                <label className="filter-label">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="filter-select"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Filters (Chips) */}
            <div className="quick-filters">
              <span className="quick-filters-label">Quick Filters:</span>
              <div className="filter-chips">
                {['Beach', 'Mountain', 'Luxury', 'Budget-Friendly'].map(chip => (
                  <button
                    key={chip}
                    className={`filter-chip ${filters.category === chip ? 'active' : ''}`}
                    onClick={() => handleFilterChange('category', filters.category === chip ? '' : chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters() && !showFilters && (
        <div className="active-filters">
          {searchQuery && (
            <div className="active-filter-tag">
              Search: {searchQuery}
              <button onClick={() => setSearchQuery('')}>×</button>
            </div>
          )}
          {filters.location && (
            <div className="active-filter-tag">
              Location: {filters.location}
              <button onClick={() => handleFilterChange('location', '')}>×</button>
            </div>
          )}
          {filters.category && (
            <div className="active-filter-tag">
              {filters.category}
              <button onClick={() => handleFilterChange('category', '')}>×</button>
            </div>
          )}
          {(filters.minPrice || filters.maxPrice) && (
            <div className="active-filter-tag">
              Price: ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
              <button onClick={() => {
                handleFilterChange('minPrice', '');
                handleFilterChange('maxPrice', '');
              }}>×</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
