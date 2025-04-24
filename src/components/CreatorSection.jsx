import React, { useState } from "react";
import { toast } from "react-toastify";
import PreguntaCreador from "./PreguntaCreador.jsx";
import TriviaService from "../service/TriviaService.js";  
import "../assets/css/triviaCreator.css";

const CreatorSection = () => {
  const [questionsData, setQuestionsData] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState(""); 
  const [description, setDescription] = useState("");
  const [isReadyToSave, setIsReadyToSave] = useState(false);
  const [isReadyToShare, setIsReadyToShare] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedTrivia, setSelectedTrivia] = useState(null);

  const addQuestion = (newQuestion) => {
    setQuestionNumber((prevQuestionNumber) => prevQuestionNumber + 1);
    setQuestionsData((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  const triviaService = new TriviaService();

  const handleFinishQuestions = () => {
    if (questionsData.length === 0) {
      toast.error("No se puede guardar una trivia sin preguntas");
      return;
    }
    setIsReadyToSave(true);
  };

  const handleSave = () =>{
    if (name.trim() === "") {
      toast.error("El nombre de la trivia no puede estar vacío");
      return false;
    }
    const trivia = {
      id: null,
      name: name,
      questions: questionsData,
      canBeExported: true,
      ...(author && { author: author }),
      ...(description && { description: description })
    };

    const triviaSaved = triviaService.saveTrivia(trivia);
    setSelectedTrivia(triviaSaved);
    setIsSaved(true);
    setIsReadyToShare(true);
    

  }

  const handleShare = () => {
    setIsReadyToShare(false);
    triviaService.exportTrivia(selectedTrivia)
    toast.success("Trivia exportada correctamente");

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
        <div className="config-menu">
          <input
            type="text"
            placeholder="Eligir nombre para tu trivia"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Autor (Opcional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripcion (Opcional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleSave}  disabled={isSaved}>Guardar Trivia</button>
          <button onClick={handleShare} disabled={!isReadyToShare}>
            Subir Trivia
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatorSection;