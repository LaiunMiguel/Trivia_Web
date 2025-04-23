import React, { useState, useEffect } from "react";
import TriviaSelected from "./TriviaSelected.jsx";

const TriviaConfig = ({ triviaSelected}) => {

  return (
    <div className="DeckConfigurator">
        <TriviaSelected questionsData={triviaSelected} timeChosen={60} />
    </div>
  );
};

export default TriviaConfig;
