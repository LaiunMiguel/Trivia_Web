import React, {useState } from "react";
import { toast } from "react-toastify";
import "../assets/css/triviaForm.css";


const TriviaForm = ({handleBackButton,handleSave,handleShare}) => {

  const [name, setName] = useState("");
  const [author, setAuthor] = useState(""); 
  const [description, setDescription] = useState("");
  const [isReadyToShare, setIsReadyToShare] = useState(false);
  const [isSaved, setIsSaved] = useState(false);


  const handleSaveButton = () => {

    if (name.trim() === "") {
      toast.error("El nombre de la trivia no puede estar vacío");
      return false;
    }
    const formData = {
        name: name.trim(),
        ...(author.trim() && { author: author.trim() }),
        ...(description.trim() && { description: description.trim() })
      };
    
    handleSave(formData)
    setIsSaved(true);
    setIsReadyToShare(true);
  }

  const handleShareButton = () => {
    setIsReadyToShare(false)
    handleShare(true)
  }

  return (
    <div className="config-menu">
    <input
      type="text"
      placeholder="Eligir nombre para tu trivia"
      value={name}
      maxLength={35}
      onChange={(e) => setName(e.target.value)}
    />
    <input
      type="text"
      placeholder="Autor (Opcional)"
      value={author}
      maxLength={15}
      onChange={(e) => setAuthor(e.target.value)}
    />
    <input
      type="text"
      placeholder="Descripcion (Opcional)"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
    <div className="button-container">

    <button onClick={handleBackButton}  disabled={isSaved}>Volver Atras</button>
    <button onClick={handleSaveButton}  disabled={isSaved}>Guardar Trivia</button>
    <button onClick={handleShareButton} disabled={!isReadyToShare}>
      Subir Trivia
    </button>
    </div>
  </div>
  )

  
};

export default TriviaForm