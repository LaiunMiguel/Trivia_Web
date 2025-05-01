import React, { useState, useEffect } from "react";
import "../../assets/css/pregunta.css";

const Pregunta = ({ questionData, onAnswerCorrect, onAnswerIncorrect,alredyResponded }) => {
  const [flip, setFlip] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setFlip(false);
    setAnswer("");
    if (alredyResponded) {
      setIsAnswered(true);
    } else {
      setIsAnswered(false);
    }
  }, [questionData]);

  const handleFlip = () => {
    setFlip((prev) => !prev);
    setAnswer(questionData.r);
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
          <div className="answer">
            <h2>{answer}</h2>
            <div className="honestMan">
              <button onClick={(e) => {e.stopPropagation();onAnswerCorrect();setIsAnswered(true);}} disabled={isAnswered} data-icon="✔">
                Acerté
              </button>
              <button onClick={(e) => {e.stopPropagation();onAnswerIncorrect();setIsAnswered(true);}}disabled={isAnswered} data-icon="✖">
                Fallé
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Pregunta;
