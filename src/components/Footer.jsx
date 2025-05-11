import React from 'react';
import '../assets/css/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2 className="footer-title">Trivia Web</h2>
          <p>2025 - Laiun Miguel</p>
        </div>

        <div className="footer-section">
          <h2 className="footer-title">Mis redes:</h2>
          <ul className="social-links">
            <li>
              <a href="https://www.linkedin.com/in/miguel-laiun-913442324" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 aria-label="LinkedIn">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/LaiunMiguel" 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 aria-label="GitHub">
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
