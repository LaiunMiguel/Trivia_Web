import React, { useState, useEffect } from "react";
import DeckConfigurator from "./DeckConfigurator.jsx";
import "../assets/css/deckSelector.css";

const DeckSelector = ({ mode, handleModeChange }) => {
  const [triviaSelected, setTriviaSelected] = useState([]);
  const [isConfigured, setIsConfigured] = useState(false);
  const [triviasData, setTriviasData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState("");
  const [timerSelected, setTimerSelected] = useState(60);

  useEffect(() => {
    const storedTrivias = localStorage.getItem("trivia_decks");
    if (storedTrivias) {
      const parsedTrivias = JSON.parse(storedTrivias);
      setTriviasData(parsedTrivias);
      if (parsedTrivias.length > 0) {
        setTriviaSelected(parsedTrivias[0]);
      }
    }
  }, []);

  const handleTriviaSelection = (selectedTrivia) => {
    setTriviaSelected(selectedTrivia);
  };

  const handleStart = () => {
    if (triviaSelected.length === 0) {
      alert("No trivia selected");
      return;
    }
    setIsConfigured(true);
  };

  const handleTimer = (time) => {
    setTimerSelected(time);
  };

  return (
    <div className="DeckSelector">
      {!isConfigured ? (
        <>
          <label>Elije una trivia:</label>
          <select value={selectedIndex} onChange={(e) => {setSelectedIndex(e.target.value); handleTriviaSelection(triviasData[e.target.value]);}}>
            {triviasData.map((trivia, index) => (
              <option key={index} value={index}>
                 {trivia.name || "Sin nombre"}
              </option>
            ))}
          </select>
          <label>Tiempo:</label>
          <input type="number" min="5" max="300" step="5" defaultValue={60} onChange={(e) => handleTimer(e.target.value)} />
          <button onClick={handleStart} disabled={triviaSelected.length === 0}>Start</button>
        </>
      ) : (
        <>
          <DeckConfigurator triviaSelected={triviaSelected} timerSelected={timerSelected} />
        </>
      )}
    </div>
  );
};

export default DeckSelector;

            
   