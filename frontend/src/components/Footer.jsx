import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <i className="fa-solid fa-hotel"></i>
            <span>WanderLust</span>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">
              Privacy
            </a>
            <a href="#" className="footer-link">
              Terms
            </a>
            <a href="#" className="footer-link">
              About
            </a>
          </div>
          <div className="footer-socials">
            <a href="#" className="social-link">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fa-brands fa-twitter"></i>
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 WanderLust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
