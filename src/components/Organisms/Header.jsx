import React from 'react';
import '../../assets/css/header.css';
import { useNavigate } from 'react-router';

const logoUrl = process.env.PUBLIC_URL + '/logo.png';

const Header = () => {
  const navigate = useNavigate(); 

  return (
    <header className="header">
      <div className="header-content" onClick={() => navigate('/')} style={{cursor:"pointer"}}> 
        <div className="logo">
          <img src={logoUrl} alt="Trivia Web Logo" className="logo-image" />
        </div>
        <h1 className="app-title">Trivia Web</h1>
      </div>
    </header>
  );
};

export default Header;