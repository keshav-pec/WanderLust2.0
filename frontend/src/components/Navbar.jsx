import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <i className="fa-solid fa-hotel"></i>
          <span className="brand-text">WanderLust</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Explore
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/listings/new" className="nav-link">
                Add Listing
              </Link>
              <span className="nav-link user-name">
                <i className="fa-solid fa-user"></i> {user?.username}
              </span>
              <button onClick={handleLogout} className="btn btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
