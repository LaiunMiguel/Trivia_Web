import React, { useState, useEffect } from "react";
import { handleShareGoogle } from "../utils/triviaUtils.js";
import LZString from "lz-string";
import "../assets/css/TriviasManajer.css";

const TriviasManajer = () => {
  const [triviasData, setTriviasData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [selectedTrivia, setSelectedTrivia] = useState(null);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    loadTrivias();
  }, []);

  class Trivia {
    constructor(name, author, description, codigo) {
      this.name = name;
      this.author = author;
      this.description = description;
      this.codigo = codigo;
    }
  }

  const loadTrivias = () => {
    const storedTrivias = localStorage.getItem("trivia_decks");
    if (storedTrivias) {
      setTriviasData(JSON.parse(storedTrivias));
    }
  };

  const handleTriviaSelection = (index) => {
    setSelectedIndex(index);
    setSelectedTrivia(triviasData[index]);
  };

  const handleDeleteTrivia = () => {
    if (selectedIndex === "") {
      alert("No hay trivia seleccionada para eliminar");
      return;
    }

    const updatedTrivias = [...triviasData];
    updatedTrivias.splice(selectedIndex, 1);
    localStorage.setItem("trivia_decks", JSON.stringify(updatedTrivias));
    setTriviasData(updatedTrivias);
    setSelectedIndex("");
    setSelectedTrivia(null);
    alert("Trivia eliminada correctamente");
  };


  const importTrivia = (trivia) => {
    try {
      const decompressed = LZString.decompressFromBase64(trivia.codigo);
      const preguntas = JSON.parse(decompressed);
  
      const newTrivia = {
        name: trivia.name,
        author: trivia.author,
        description: trivia.description,
        questions: preguntas,
        canBeExported: false
      };
  
      const existingTrivias = [...triviasData];
      existingTrivias.push(newTrivia);
      localStorage.setItem("trivia_decks", JSON.stringify(existingTrivias));
      setTriviasData(existingTrivias);
      alert("Trivia importada correctamente!");
    } catch (e) {
      console.error("Error al importar trivia:", e);
      alert("Error al importar trivia. Código inválido.");
    }
  };
  

  const handleLoadFromGoogle = async () => {
    const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQg3Lw9g7-dzxR06bUd3QNsrXN2wLuKADNpgueNfgYmu-cLLRwG66mzprF4bJaV57tr-F-EX-TnZY9d/pub?gid=1022024749&single=true&output=csv";
    try {
      const response = await fetch(url);
      const csv = await response.text();
      const rows = csv.split("\n").slice(1);
      
      let importCount = 0;
      for (const row of rows) {
        const [, nombre,codigo,descricion, autor] = row.split(",");
        const trivia = new Trivia(nombre, autor, descricion, codigo);
        importCount++;
        importTrivia(trivia);
      }
      alert(`Se importaron ${importCount} trivias desde Google.`);
    } catch (error) {
      console.error("Error cargando CSV:", error);
      alert("Error al cargar trivias desde Google.");
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const update = await handleShareGoogle(selectedTrivia, selectedIndex);
      setTriviasData(update);
    } catch (error) {
      console.error("Error sharing trivia:", error);
      setIsSharing(false); // Disable the button immediately
    }
  };

  return (
    <div className="TriviasManajer">
      <h2>Gestor de Trivias</h2>
      
      <div className="trivia-list">
        <h3>Trivias Guardadas</h3>
        <select
          value={selectedIndex}
          onChange={(e) => handleTriviaSelection(e.target.value)}
        >
          <option value="" disabled>
            Selecciona una trivia
          </option>
          {triviasData.map((trivia, index) => (
            <option key={index} value={index}>
              {trivia.name || "Sin nombre"}
            </option>
          ))}
        </select>
      </div>

      {selectedTrivia && (
        <div className="trivia-details">
          <h3>Detalles de la Trivia</h3>
          <p><strong>Nombre:</strong> {selectedTrivia.name || "Sin nombre"}</p>
          <p><strong>Preguntas:</strong> {selectedTrivia.questions?.length || 0}</p>
          <p><strong>Autor:</strong> {selectedTrivia.author || "Desconocido"}</p>
          <p><strong>Decripcion:</strong> {selectedTrivia.author || "Sin decripcion"}</p>
        </div>
      )}

      <div className="trivia-actions">
        <h3>Acciones</h3>
        <div className="button-group">
          <button onClick={handleDeleteTrivia} disabled={selectedIndex === ""}>
            Eliminar Trivia
          </button>
          <button
            onClick={handleShare}
            disabled={selectedIndex === "" || !selectedTrivia?.canBeExported || isSharing} // Disable if sharing
          >
            Compartir
          </button>
        </div>
        
        <div className="button-group">
          <button onClick={handleLoadFromGoogle}>
            Cargar trivias online
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default TriviasManajer;