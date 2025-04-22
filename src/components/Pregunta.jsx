import React, { useState, useEffect } from 'react';
import '../assets/css/preguntas.css';

const Pregunta = ({ questionData, onAnswer }) => {
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    setFlip(false);
  }, [questionData]);

  const handleFlip = () => {
    setFlip((prev) => !prev);
    onAnswer();
  };

  return (
    <div
      className={`preguntaTarjeta ${flip ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      <div className="preguntaTarjeta__cara preguntaTarjeta__frontal">
        <h2>{questionData.q}</h2>
      </div>

      <div className="preguntaTarjeta__cara preguntaTarjeta__trasera">
        {flip && <h2>{questionData.r}</h2>}
      </div>
    </div>
  );
};

export default Pregunta;
