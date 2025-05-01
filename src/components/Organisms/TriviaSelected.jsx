import React, { useState, useEffect } from "react";
import PreguntaHandler from "./PreguntaHandler.jsx";
import Timer from "../Atoms/Timer.jsx";
import "../../assets/css/TriviaSelected.css";
import { useNavigate } from 'react-router';


const TriviaSelected = ({ questionsData, timeChosen,handleFinish,randomSort }) => {
  const [cantPreguntas, setCantPreguntas] = useState(0);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [preguntas, setPreguntas] = useState([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isAnswered , setIsAnswered ] = useState(false);
  const [puntaje, setPuntaje] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const navigate = useNavigate();




  useEffect(() => {
    if (randomSort) {
      const shuffledQuestions = [...questionsData.questions].sort(
        () => Math.random() - 0.5
      );
      setPreguntas(shuffledQuestions);
    }
    else {
      setPreguntas(questionsData.questions);
    }
      setPreguntaActual(0);
      setCantPreguntas(questionsData.questions.length);
      setIsTimerActive(true);
  }, [questionsData]);

  const handleSiguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1 ) {
      setIsAnswered(false);
      setPreguntaActual((prev) => prev + 1);
      setIsTimerActive(true);
    }
    else {
      setIsFinish(true);
      handleFinish(puntaje);
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
            <h2>Preguntas restantes: {cantPreguntas - preguntaActual -1}</h2>
            <h2>Puntaje: {puntaje}</h2>
            <h2>Tiempo restante: <Timer key={preguntaActual} timeLimit={timeChosen} onTimeUp={handleTimeUp} isActive={isTimerActive} /></h2>
          </div>
            {preguntas.length > 0 && (
              <PreguntaHandler questionData={preguntas[preguntaActual]} onAnswerCorrect={handleCorrectAnswer} onAnswerIncorrect={handleIncorrectAnswer} />
            )}
          <button onClick={handleSiguientePregunta} disabled={preguntaActual >= preguntas.length || !isAnswered}>Siguiente Pregunta</button>
        </>
      ) : (
        <div className="final-score">
          <h2>¡Has terminado!</h2>
          <h2>Respondiste correctamente {puntaje} de {cantPreguntas} preguntas</h2>
          <button onClick={() => {navigate("/Play")}}>Volver al Menu</button>
        </div>
      )}
    </div>
  );
};

export default TriviaSelected;
