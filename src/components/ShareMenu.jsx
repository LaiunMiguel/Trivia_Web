import React, { useState } from "react";
import { FaWhatsapp, FaFacebook, FaTwitter, FaTelegram, FaLink } from "react-icons/fa";
import "../assets/css/shareMenu.css";

const ShareMenu = ({ url, text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const links = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
    }
  };

  return (
    <div className="share-menu">
      <button onClick={toggleMenu} className="share-button" aria-label="Abrir menú de compartir">Compartir</button>
      {isOpen && (
        <div className="share-options">
          <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Compartir por WhatsApp">
            <FaWhatsapp /> WhatsApp
          </a>
          <a href={links.facebook} target="_blank" rel="noopener noreferrer" aria-label="Compartir por Facebook">
            <FaFacebook /> Facebook
          </a>
          <a href={links.twitter} target="_blank" rel="noopener noreferrer" aria-label="Compartir por X (Twitter)">
            <FaTwitter /> X (Twitter)
          </a>
          <a href={links.telegram} target="_blank" rel="noopener noreferrer" aria-label="Compartir por Telegram">
            <FaTelegram /> Telegram
          </a>
          <button className="copy-link" onClick={handleCopy} aria-label="Copiar enlace">
            <FaLink /> {copied ? "¡Copiado!" : "Copiar Link"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShareMenu;
