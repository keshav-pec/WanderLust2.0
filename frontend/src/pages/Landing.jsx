import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Landing.css";

const Landing = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section with Video Background */}
      <section className="hero-section">
        <div className="video-background">
          <video autoPlay loop muted playsInline className="hero-video">
            <source
              src="https://videos.pexels.com/video-files/3015510/3015510-uhd_2732_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="video-overlay"></div>
        </div>

        <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
          <h1 className="hero-title animate-fade-in">
            Discover Your Next
            <span className="gradient-text"> Adventure</span>
          </h1>
          <p className="hero-subtitle animate-fade-in-delay">
            Explore unique stays and experiences around the world
          </p>
          <div className="hero-buttons animate-fade-in-delay-2">
            <Link to="/listings" className="btn btn-primary btn-large">
              <i className="fas fa-compass"></i>
              Explore Destinations
            </Link>
            <Link to="/listings/new" className="btn btn-secondary btn-large">
              <i className="fas fa-home"></i>
              List Your Property
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose WanderLust?</h2>
          <div className="features-grid">
            <div className="feature-card" data-aos="fade-up">
              <div className="feature-icon">
                <i className="fas fa-globe-americas"></i>
              </div>
              <h3>Worldwide Destinations</h3>
              <p>Discover unique properties in over 190 countries</p>
            </div>
            
            <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Secure Booking</h3>
              <p>Book with confidence with our secure payment system</p>
            </div>
            
            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon">
                <i className="fas fa-star"></i>
              </div>
              <h3>Verified Reviews</h3>
              <p>Read authentic reviews from real travelers</p>
            </div>
            
            <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h3>24/7 Support</h3>
              <p>Get help anytime, anywhere from our support team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Destination Showcase with Parallax */}
      <section className="destination-showcase">
        <div className="showcase-video-bg">
          <video autoPlay loop muted playsInline className="showcase-video">
            <source
              src="https://videos.pexels.com/video-files/3843201/3843201-uhd_2732_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="showcase-overlay"></div>
        </div>
        
        <div className="container showcase-content">
          <div className="showcase-text">
            <h2 className="showcase-title">
              Experience Luxury
              <br />
              <span className="gradient-text">Like Never Before</span>
            </h2>
            <p className="showcase-description">
              From cozy cabins to luxury villas, find your perfect escape. 
              Every property is handpicked to ensure an unforgettable stay.
            </p>
            <Link to="/listings" className="btn btn-white btn-large">
              Browse Collection
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number" data-count="10000">10K+</div>
              <div className="stat-label">Properties</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" data-count="50000">50K+</div>
              <div className="stat-label">Happy Travelers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" data-count="190">190+</div>
              <div className="stat-label">Countries</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" data-count="4.9">4.9</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="popular-destinations">
        <div className="container">
          <h2 className="section-title">Popular Destinations</h2>
          <div className="destinations-grid">
            <div className="destination-card large">
              <img
                src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800"
                alt="Beach House"
              />
              <div className="destination-overlay">
                <h3>Beach Houses</h3>
                <p>500+ Properties</p>
              </div>
            </div>
            
            <div className="destination-card">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
                alt="Mountains"
              />
              <div className="destination-overlay">
                <h3>Mountain Retreats</h3>
                <p>300+ Properties</p>
              </div>
            </div>
            
            <div className="destination-card">
              <img
                src="https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800"
                alt="City"
              />
              <div className="destination-overlay">
                <h3>City Apartments</h3>
                <p>800+ Properties</p>
              </div>
            </div>
            
            <div className="destination-card">
              <img
                src="https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?w=800"
                alt="Villa"
              />
              <div className="destination-overlay">
                <h3>Luxury Villas</h3>
                <p>200+ Properties</p>
              </div>
            </div>
            
            <div className="destination-card">
              <img
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800"
                alt="Camping"
              />
              <div className="destination-overlay">
                <h3>Camping & Nature</h3>
                <p>150+ Properties</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Journey?</h2>
            <p className="cta-description">
              Join thousands of travelers finding their perfect getaway
            </p>
            <Link to="/signup" className="btn btn-white btn-large">
              Get Started Free
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
