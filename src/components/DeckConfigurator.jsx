import React, { useState, useEffect } from "react";
import TriviaSelected from "./TriviaSelected.jsx";

const DeckSelector = ({ triviaSelected,timerSelected }) => {

  return (
    <div className="DeckConfigurator">
        <TriviaSelected questionsData={triviaSelected} timeChosen={timerSelected} />
    </div>
  );
};

export default DeckSelector;
