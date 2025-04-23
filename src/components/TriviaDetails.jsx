import React, { useState } from "react";
import "../assets/css/triviaDetails.css";

const TriviaDetails = ({triviaData,handleClick,handleShare,handleDelete}) => {

    const [isSharing, setIsSharing] = useState(false);

    const handleSharePersonal = () => {
        setIsSharing(true);
        handleShare(triviaData);
    }

    return (
      <div className="trivia-details">
          <div onClick={() => handleClick(triviaData)} style={{cursor: "pointer"}}>
            <h3>Detalles de la Trivia</h3>
            <p><strong>Nombre:</strong> {triviaData.name || "Sin nombre"}</p>
            <p><strong>Preguntas:</strong> {triviaData.questions?.length || 0}</p>
            <p><strong>Autor:</strong> {triviaData.author || "Desconocido"}</p>
            <p><strong>Decripcion:</strong> {triviaData.description || "Sin decripcion"}</p>
          </div>
          <div className="buttons">
            <button onClick={()=> handleDelete(triviaData)}>Borrar</button>
            <button onClick={()=> handleSharePersonal()} disabled={!triviaData.canBeExported || isSharing }>Compartir</button>
          </div>
          
      </div>
    )
}

export default TriviaDetails;