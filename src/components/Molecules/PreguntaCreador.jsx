import "../../assets/css/preguntaCreador.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PreguntaCreador = ({ onAddQuestion, questionData }) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isMultipleChoice, setIsMultipleChoice] = useState(false);
  const [containImage, setcontainImage] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Maneja la actualización de la pregunta
  const handleQuestionChange = (e) => {
    setQuestionText(e.target.value);
  };

  useEffect(() => {
    if (questionData) {
      setQuestionText(questionData.q);
      setOptions(questionData.o || ["", "", "", ""]);
      setCorrectAnswer(questionData.r);
      setIsMultipleChoice(questionData.o ? true : false);
      setcontainImage(questionData.img ? true : false);
      setImageUrl(questionData.img || "");
    }

    else{
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      setImageUrl("");
      setcontainImage(false);
    }
    
  }, [questionData])

  // Maneja la actualización de las opciones
  const handleResponseChange = (index, value) => {
    if (index === 0) {
      setCorrectAnswer(value);
    }
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleToggleMultipleChoice = () => {
    setIsMultipleChoice((prev) => !prev);
  };

  const handleToggleContainImage = () => {
    setcontainImage((prev) =>!prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!questionText || !correctAnswer) {
      if (!questionText) {
        toast.warning("Por favor, completa el campo de pregunta.");
        return;
      }
      toast.warning("Por favor, completa el campo de respuesta correcta.");
      return;
    }

    if (isMultipleChoice && !options.some((option) => option)) {
      toast.warning("Por favor, completa todas las opciones.");
      return;
    }

    if (containImage && !imageUrl) {
      toast.warning("Por favor, agrega la URL de la imagen.");
      return;
    }

    // Validar si la URL es una imagen válida
    if (containImage && imageUrl) {
      const img = new window.Image();
      img.onload = () => {
        const newQuestion = {
          q: questionText,
          r: correctAnswer,
          ...(isMultipleChoice && { o: options }),
          ...(imageUrl && { img: imageUrl }),
        };
        onAddQuestion(newQuestion);
        setQuestionText("");
        setOptions(["", "", "", ""]);
        setCorrectAnswer("");
        setImageUrl("");
        setcontainImage(false);
      };
      img.onerror = () => {
        toast.warning("La URL de la imagen no es válida o no se pudo cargar.");
      };
      img.src = imageUrl;
      return; // Salir para esperar la validación asíncrona
    }

    const newQuestion = {
      q: questionText,
      r: correctAnswer,
      ...(isMultipleChoice && { o: options }),
      ...(imageUrl && { img: imageUrl }),
    };

    onAddQuestion(newQuestion);

    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setImageUrl("");
    setcontainImage(false);
  };

  return (
    <div className="question-creator">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pregunta:</label>
          <input 
            type="text"
            value={questionText}
            maxLength={100}
            onChange={handleQuestionChange}
            placeholder="Escribe la pregunta"
          />
        </div>
        
        <div className="multipleBox">
          <label htmlFor="multiple-choice">¿Tiene una imagen?</label>
          <input
            id="multiple-choice"
            type="checkbox"
            checked={containImage}
            onChange={handleToggleContainImage}
          />
        </div>

        {containImage &&    
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Pegue la url de la imagen"
          />
        }
        <div className="multipleBox">
          <label htmlFor="multiple-choice">¿Es una pregunta de opción múltiple?</label>
          <input
            id="multiple-choice"
            type="checkbox"
            checked={isMultipleChoice}
            onChange={handleToggleMultipleChoice}
          />
        </div>

        {isMultipleChoice && (
          <>
            <div>
            <label>Opciones (la primera es la correcta):</label>
              <div className="options-grid">
                {options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    maxLength={45}
                    onChange={(e) =>
                      handleResponseChange(index, e.target.value)
                    }
                    placeholder={
                      index === 0
                        ? "Respuesta correcta"
                        : `Incorrecta ${index}`
                    }
                    className={
                      index === 0 ? "correct-option" : "incorrect-option"
                    }
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {!isMultipleChoice && (
          <div>
            <label>Respuesta Correcta:</label>
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => handleResponseChange(0, e.target.value)}
              placeholder="Respuesta correcta"
              maxLength={45}
            />
          </div>
        )}

        <button type="submit">
          {questionData && questionData.q ? "Editar Pregunta" : "Agregar Pregunta"}
        </button>
      </form>
    </div>
  );
};

export default PreguntaCreador;
