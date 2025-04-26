import React, {useState} from "react";
import TriviaSelected from "./TriviaSelected.jsx";


const TriviaConfig = ({ triviaSelected, handleFinish}) => {

  const [isConfigured, setIsConfigured] = useState(false);
  const [timeChosen, setTimeChosen] = useState(60);
  const [randomSort, setRandomSort] = useState(false);
  

  const handeChangeRandomSort = () => {
    setRandomSort(prev => !prev); // Verificar el valor del checkb
  }

  return (
    <>
      {!isConfigured ? (
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
              value={randomSort}
              onChange={handeChangeRandomSort}
            />
          </div>
          <button onClick={() => setIsConfigured(true)}>Comenzar</button>
        </div>  
        ) : (
        <TriviaSelected questionsData={triviaSelected} timeChosen={timeChosen} handleFinish={handleFinish} randomSort={randomSort}/>
      )}
    </>
  );
};

export default TriviaConfig;
