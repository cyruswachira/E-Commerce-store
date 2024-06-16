import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>
            Welcome to My E-Commerce Store. We offer the best products at the most
            affordable prices. Our mission is to bring you the best shopping experience.
          </p>
        </div>
    
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>
            <i className="fas fa-map-marker-alt"></i> 254 E-Commerce Store, Online City, Web
          </p>
          <p><i className="fas fa-phone"></i> +254 712 345 678</p>
          <p><i className="fas fa-envelope"></i> support@ecommerce.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 My E-Commerce Store | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
