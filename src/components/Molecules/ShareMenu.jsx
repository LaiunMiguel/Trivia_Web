import React, { useState } from "react";
import { FaWhatsapp, FaFacebook, FaTwitter, FaTelegram } from "react-icons/fa";
import "../../assets/css/shareMenu.css";

const ShareMenu = ({ url, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const links = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="share-menu">
      <button onClick={toggleMenu} className="share-button">Compartir</button>
      {isOpen && (
        <div className="share-options">
        <a href={links.whatsapp} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp /> WhatsApp
        </a>
        <a href={links.facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebook /> Facebook
        </a>
        <a href={links.twitter} target="_blank" rel="noopener noreferrer">
            <FaTwitter /> X (Twitter)
        </a>
        <a href={links.telegram} target="_blank" rel="noopener noreferrer">
            <FaTelegram /> Telegram
        </a>
    </div>
      )}
    </div>
  );
};

export default ShareMenu;
