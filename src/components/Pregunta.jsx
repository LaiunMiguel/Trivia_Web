import React, { useState, useEffect } from "react";
import "../assets/css/pregunta.css";

const Pregunta = ({ questionData, onAnswerCorrect, onAnswerIncorrect }) => {
  const [flip, setFlip] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setFlip(false);
    setIsAnswered(false);
  }, [questionData]);

  const handleFlip = () => {
    setFlip((prev) => !prev);
  };

  return (
    <div
      className={`preguntaTarjeta ${flip ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="preguntaTarjeta__cara preguntaTarjeta__frontal">
        <h2>{questionData.q}</h2>
      </div>

      <div className="preguntaTarjeta__cara preguntaTarjeta__trasera">
        {flip && (
          <div className="response">
            <h2>{questionData.r}</h2>
            <div className="honestMan">
              <button onClick={(e) => {e.stopPropagation();onAnswerCorrect();setIsAnswered(true);}} disabled={isAnswered} data-icon="✔">
                Acerté
              </button>
              <button onClick={(e) => {e.stopPropagation();onAnswerIncorrect();setIsAnswered(true);}}disabled={isAnswered} data-icon="✖">
                Fallé
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pregunta;
