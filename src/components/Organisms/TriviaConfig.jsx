import React, { useState, useEffect } from "react";
import TriviaSelected from "./TriviaSelected.jsx";
import TriviaService from "../../service/TriviaService.js";
import { useParams } from 'react-router';
import { toast } from "react-toastify";


const TriviaConfig = () => {
  const { trivia_id } = useParams();
  const [isConfigured, setIsConfigured] = useState(false);
  const [timeChosen, setTimeChosen] = useState(60);
  const [randomSort, setRandomSort] = useState(false);
  const [triviaSelected, setTriviaSelected] = useState([]);
  const [isImporting, setIsImporting] = useState(false);

  // --- Service ---
  const triviaService = new TriviaService();

  useEffect(() => {
    const trivia = triviaService.getTriviaById(trivia_id);
    setTriviaSelected(trivia);
  }, [trivia_id]);

  const handleFinish = (score) => {
    triviaService.markAsResolved(triviaSelected, score);
  }

  const handeChangeRandomSort = () => {
    setRandomSort(prev => !prev);
  }

  const handleImport = async () => {
    setIsImporting(true);
    try {
      await triviaService.importOnly(trivia_id);
      toast.success("Trivia importada correctamente");
      setTriviaSelected(triviaService.getTriviaById(trivia_id));
    } catch (error) {
      toast.error(error.message);
    }  }

  return (
    <div className="ConfigTrivia">
      {!triviaSelected ? (
      <div className="final-score">
        <h2>No tienes esta trivia!</h2>
        <h2>Prueba importarla si existe!</h2>
        <button onClick={handleImport} disabled ={isImporting}>Importar</button>
      </div>
      ) : !isConfigured ? (
        <div className="deck-config">
          <h1>Configuración de Trivia</h1>
          <div className="deck-config-menu">
            <p>Elige el tiempo de la trivia:</p>
            <input
              type="number"
              value={timeChosen}
              onChange={(e) => setTimeChosen(e.target.value)}
            />
            <p>Las preguntas se dan en orden aleatorio:</p>
            <input
              id="multiple-choice"
              type="checkbox"
              checked={randomSort}
              onChange={handeChangeRandomSort}
            />
          </div>
          <button onClick={() => setIsConfigured(true)}>Comenzar</button>
        </div>
      ) : (
        <TriviaSelected questionsData={triviaSelected} timeChosen={timeChosen} handleFinish={handleFinish} randomSort={randomSort} />
      )}
    </div>
  );
};

export default TriviaConfig;
