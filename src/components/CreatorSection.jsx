import React, {useState } from "react";
import { toast } from "react-toastify";
import PreguntaCreador from "./PreguntaCreador.jsx";
import TriviaForm from "./TriviaForm.jsx"
import TriviaService from "../service/TriviaService.js";  
import "../assets/css/triviaCreator.css";

const triviaService = new TriviaService();

const CreatorSection = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [isReadyToSave, setIsReadyToSave] = useState(false);
  const [selectedTrivia, setSelectedTrivia] = useState(null);

  const addQuestion = (newQuestion) => {
    setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    setQuestionsData((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const handleSave = (formData) => {
    try {
      const trivia = {
        id: null,
        name: formData.name.trim(),
        questions: questionsData,
        canBeExported: true,
        ...(formData.author && { author: formData.author }),
        ...(formData.description && {description:formData.description})
      };
      const triviaSaved = triviaService.saveTrivia(trivia);
      setSelectedTrivia(triviaSaved);
      toast.success("Trivia guardada exitosamente");
    } 
    catch (error) {
      toast.error("Error al guardar la trivia");
      console.error(error);
    }
  }

  const handleFinishQuestions = () => {
    if (questionsData.length === 0) {
      toast.error("La trivia debe tener al menos una pregunta");
      return;
    }
    setIsReadyToSave(true);
  };

  const handleShare = async () => {
    console.log(selectedTrivia)
    try {
      await triviaService.exportTrivia(selectedTrivia);
      toast.success("Trivia exportada correctamente");
    } catch (error) {
      toast.error("Error al exportar la trivia intentalo mas tarde");
    }
  };



  return (
    <div className="DeckCreator">
      {!isReadyToSave ? (
        <div className="creator-menu">
          <h2>Pregunta numero {questionNumber}</h2>
          <PreguntaCreador onAddQuestion={addQuestion} />
          <button onClick={handleFinishQuestions}>Terminar Trivia</button>
        </div>
      ) : (
        <TriviaForm handleSave={handleSave} handleShare={handleShare}/>
      )}
    </div>
  );
};

export default CreatorSection;