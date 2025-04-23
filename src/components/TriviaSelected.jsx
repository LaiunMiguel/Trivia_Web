import React, { useState, useEffect } from "react";
import PreguntaHandler from "./PreguntaHandler.jsx";
import Timer from "./Timer.jsx";
import "../assets/css/TriviaSelected.css";

const TriviaSelected = ({ questionsData, timeChosen }) => {
  const [cantPreguntas, setCantPreguntas] = useState(0);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [preguntas, setPreguntas] = useState([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isAnswered , setIsAnswered ] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [isFinish, setIsFinish] = useState(false);

  useEffect(() => {
    if (questionsData.questions) {
      const shuffledQuestions = [...questionsData.questions].sort(
        () => Math.random() - 0.5
      );
      setPreguntas(shuffledQuestions);
      setPreguntaActual(0);
      setCantPreguntas(shuffledQuestions.length);
      setIsTimerActive(true);
    }
  }, [questionsData]);

  const handleSiguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1 ) {
      setIsAnswered(false);
      setPreguntaActual((prev) => prev + 1);
      setIsTimerActive(true);
    }
    else {
      setIsFinish(true);
    }
  };

  const handleAnswer = () => {
    setIsAnswered(true);
    pauseTimer();
  };

  const handleCorrectAnswer = () => {
    setPuntaje((prev) => prev + 1);
    handleAnswer(); 
  }
  
  const handleIncorrectAnswer = () => {
    handleAnswer();
  }


  const pauseTimer = () => {
    setIsTimerActive(false);
  };

  const handleTimeUp = () => {
    handleSiguientePregunta();
  };

  return (
    <div className="MazoPregunta">
      {!isFinish ? (
        <>
          <div className="score-info">
            <h2>Preguntas restantes: {cantPreguntas - preguntaActual}</h2>
            <h2>Puntaje: {puntaje}</h2>
            <h2>Tiempo restante: <Timer key={preguntaActual} timeLimit={timeChosen} onTimeUp={handleTimeUp} isActive={isTimerActive} /></h2>
          </div>
          <div className="PreguntaActual">
            {preguntas.length > 0 && (
              <PreguntaHandler questionData={preguntas[preguntaActual]} onAnswerCorrect={handleCorrectAnswer} onAnswerIncorrect={handleIncorrectAnswer} />
            )}
          </div>
          <button onClick={handleSiguientePregunta} disabled={preguntaActual >= preguntas.length || !isAnswered}>Siguiente Pregunta</button>
        </>
      ) : (
        <div className="final-score">
          <h2>¡Has terminado!</h2>
          <h2>Respondiste correctamente {puntaje} de {cantPreguntas} preguntas</h2>
        </div>
      )}
    </div>
  );
};

export default TriviaSelected;
