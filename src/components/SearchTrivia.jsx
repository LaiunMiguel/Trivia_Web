import React, { useState } from 'react';
import "../assets/css/searchTrivia.css";

const SearchTrivia = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClick = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          name="searchTerm"
          placeholder="Nombre Trivia o Autor"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleClick()}
        />
      </div>
    <button type="submit" onClick={handleClick} aria-label="Buscar">🔍</button>
  </div>
  );
};

export default SearchTrivia;