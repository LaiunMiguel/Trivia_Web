import React, { useState, useEffect } from "react";
import TriviaConfig from "./TriviaConfig.jsx";
import TriviaDetails from "./TriviaDetails.jsx";
import LZString from "lz-string";
import Papa from "papaparse";
import { handleShareGoogle } from "../utils/triviaUtils.js";
import "../assets/css/playSection.css";

// --- Helpers ---
const decompressCode = (compressedCode) => {
  const decompressed = LZString.decompressFromBase64(compressedCode);
  return JSON.parse(decompressed);
};

class Trivia {
  constructor(index, name, author, description, codigo) {
    this.index = index;
    this.name = name;
    this.author = author;
    this.description = description;
    this.questions = decompressCode(codigo);
    this.canBeExported = false;
  }
}

const PlaySection = ({handleMenuButton}) => {
  // --- State ---
  const [triviaSelected, setTriviaSelected] = useState(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const [triviasData, setTriviasData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24;


  // --- Effects ---
  useEffect(() => {
    const storedTrivias = localStorage.getItem("trivia_decks");
    if (storedTrivias) {
      setTriviasData(JSON.parse(storedTrivias));
    }
  }, []);

  // --- Handlers ---
  const handleTriviaSelection = (trivia) => {
    setTriviaSelected(trivia);
    setIsConfigured(true);
  };

  const handleShare = async (triviaToShare) => {
    try {
      const update = await handleShareGoogle(triviaToShare, triviaToShare.index);
      setTriviasData(update);
    } catch (error) {
      console.error("Error sharing trivia:", error);
    }
  };

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleLoadFromGoogle = async () => {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQg3Lw9g7-dzxR06bUd3QNsrXN2wLuKADNpgueNfgYmu-cLLRwG66mzprF4bJaV57tr-F-EX-TnZY9d/pub?gid=1022024749&single=true&output=csv";
    try {
      const response = await fetch(url);
      const csv = await response.text();
      const parsed = Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => h.trim().toLowerCase().replaceAll(" ", "_")
      });

      const updatedTrivias = [];
      let importCount = 0;
      for (const row of parsed.data) {
        const { nombre_de_tu_trivia, código, descripción, autor } = row;
        if (nombre_de_tu_trivia && código) {
          updatedTrivias.push(new Trivia(importCount, nombre_de_tu_trivia, autor, descripción, código));
          importCount++;
        }
      }
      localStorage.setItem("trivia_decks", JSON.stringify(updatedTrivias));
      setTriviasData(updatedTrivias);
      alert(`Se importaron ${importCount} trivias desde Google.`);
    } catch (error) {
      console.error("Error cargando CSV:", error);
      alert("Error al cargar trivias desde Google.");
    }
  };

  const handleDelete = (trivia) => {
    const updatedTrivias = [...triviasData];
    updatedTrivias.splice(trivia.index, 1);
    updatedTrivias.forEach((t, idx) => t.index = idx);
    localStorage.setItem("trivia_decks", JSON.stringify(updatedTrivias));
    setTriviasData(updatedTrivias);
    alert("Trivia eliminada correctamente");
  };

  const handleRandomTrivia = () => {
    const randomIndex = Math.floor(Math.random() * triviasData.length);
    const randomTrivia = triviasData[randomIndex];
    setTriviaSelected(randomTrivia);
    setIsConfigured(true);
  };

  // --- Pagination ---
  const pageTrivias = triviasData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- Render ---
  return (
    <div className="PlaySection">
      {!isConfigured ? (
        <>

          <div className="PlayButtons">
            <button onClick={handleMenuButton}>
                Menu
            </button>
            <button onClick={handleRandomTrivia}>
                Trivia Aleatoria
            </button>
            <button onClick={handleLoadFromGoogle}>
                Cargar trivias online
            </button>
            
          </div>
          <div className="trivia-list">
          {pageTrivias.map((trivia) => (
              <TriviaDetails
                key={trivia.index}
                triviaData={trivia}
                handleClick={handleTriviaSelection}
                handleShare={handleShare}
                handleDelete={handleDelete}
                />
              ))}
          </div>
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Prev Page</button>
            <span>Page {currentPage}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage * itemsPerPage >= triviasData.length}>Next Page</button>
          </div>
        </>
      ) : (
        <TriviaConfig triviaSelected={triviaSelected}/>
      )}
    </div>
  );
};

export default PlaySection;

            
   