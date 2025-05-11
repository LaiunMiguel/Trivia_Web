import React, { useState, useEffect } from "react";
import "../assets/css/pregunta.css";

const Pregunta = ({ questionData, onAnswerCorrect, onAnswerIncorrect,alreadyResponded,isVoiceOn,handleSpeak,handleSpeakAnswer }) => {
  const [flip, setFlip] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    setFlip(false);
    setAnswer("");
  }, [questionData]);

  useEffect(() => {
    setIsAnswered(alreadyResponded);
}, [alreadyResponded]);


  useEffect(() => {
    if (isVoiceOn && handleSpeak && answer === "" ) {
      handleSpeak();
    }
  }, [questionData, isVoiceOn, handleSpeak,answer]);

  
  const handleFlip = () => {
    setFlip((prev) => !prev);
    if(answer === ""){
      setAnswer(questionData.r);
      if(isVoiceOn && handleSpeakAnswer){
        handleSpeakAnswer(questionData.r);  
      }
    }
  };

  const handleZoom = () => {
    setZoom((prev) =>!prev);
  };


  return (
    <div
      className={`preguntaTarjeta ${flip ? "flipped" : ""}`}
      onClick={handleFlip}
    >
       <div className="preguntaTarjeta__cara preguntaTarjeta__frontal">
        <h2>{questionData.q}</h2>
        {questionData.img && 
        <div className="imagen-container" onClick={(e) => {e.stopPropagation();handleZoom()}}>
          <img 
            src={questionData.img} 
            alt="Imagen de la pregunta" 
            className={zoom ? "zoomed" : ""}
          />
        </div>}
      </div>

      <div className="preguntaTarjeta__cara preguntaTarjeta__trasera">
          <div className="preguntaTarjeta__answer">
            <h2>{answer}</h2>
            <div className="preguntaTarjeta__Buttons">
              <button onClick={(e) => {e.stopPropagation();onAnswerCorrect();setIsAnswered(true);}} disabled={isAnswered} data-icon="✔" aria-label="Acerte">
                Acerté
              </button>
              <button onClick={(e) => {e.stopPropagation();onAnswerIncorrect();setIsAnswered(true);}}disabled={isAnswered} data-icon="✖" aria-label="Falle">
                Fallé
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Pregunta;