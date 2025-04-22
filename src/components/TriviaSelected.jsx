import React, { useState, useEffect } from "react";
import PreguntaHandler from "./PreguntaHandler.jsx";
import Timer from "./Timer.jsx";
import "../assets/css/TriviaSelected.css";

const TriviaSelected = ({ questionsData, timeChosen }) => {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [preguntas, setPreguntas] = useState([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isAnswered , setIsAnswered ] = useState(false);

  useEffect(() => {
    if (questionsData.questions) {
      const shuffledQuestions = [...questionsData.questions].sort(
        () => Math.random() - 0.5
      );
      setPreguntas(shuffledQuestions);
      setPreguntaActual(0);
      setIsTimerActive(true);
    }
  }, [questionsData]);

  const handleSiguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setIsAnswered(false);
      setPreguntaActual((prev) => prev + 1);
      setIsTimerActive(true);
    }
  };

  const handleAnswer = () => {
    setIsAnswered(true);
    pauseTimer();
  };

  const pauseTimer = () => {
    setIsTimerActive(false);
  };

  const handleTimeUp = () => {
    handleSiguientePregunta();
  };

  return (
    <div className="MazoPregunta">
      <Timer key={preguntaActual} timeLimit={timeChosen} onTimeUp={handleTimeUp}isActive={isTimerActive}/>
      {preguntas.length > 0 && (
        <PreguntaHandler questionData={preguntas[preguntaActual]} onAnswer={handleAnswer}/>
      )}
      <button onClick={handleSiguientePregunta} disabled={preguntaActual >= preguntas.length - 1 || !isAnswered}> Siguiente Pregunta </button>
    </div>
  );
};

export default TriviaSelected;
