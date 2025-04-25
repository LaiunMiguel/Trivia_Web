import TriviaSelected from "./TriviaSelected.jsx";

const TriviaConfig = ({ triviaSelected, handleFinish}) => {

  return (
    <div className="DeckConfigurator">
        <TriviaSelected questionsData={triviaSelected} timeChosen={6000} handleFinish={handleFinish} />
    </div>
  );
};

export default TriviaConfig;
