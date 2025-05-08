import PreguntaConOpciones from '../Molecules/PreguntaConOpciones.jsx';
import Pregunta from '../Molecules/Pregunta.jsx';

const PreguntaHandler = ({
  questionData,
  onAnswerCorrect = () => {},
  onAnswerIncorrect = () => {},
  alredyResponded,
  isVoiceOn,
  voiceSelected
}) => {

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceSelected.lang;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };
  
  const handleSpeak = (options) => {
    let fullText = questionData.q

    if (options)  {
      const letras = ['A.', 'B.', 'C.', 'D.'];
        const opcionesConLetras = options.map((op, i) => `${letras[i]}. ${op}`);
        fullText += `. Opciones: ${opcionesConLetras.join(", ")}`;
      
    }
    speak(fullText);
  };
  

  const handleSpeakAnswer = (answer) => {
    speak(answer);
  };

  const handleOnAnswerCorrect = () => {
    onAnswerCorrect();
    speechSynthesis.cancel();
  }
  const handleOnAnswerIncorrect = () => {
    onAnswerIncorrect();
    speechSynthesis.cancel();
  }

  const sharedProps = {
    questionData,
    onAnswerCorrect: handleOnAnswerCorrect,
    onAnswerIncorrect: handleOnAnswerIncorrect,
    alredyResponded,
    isVoiceOn,
    handleSpeak
  };

  if (questionData.o) {
    return <PreguntaConOpciones {...sharedProps} />;
  } else {
    return <Pregunta handleSpeakAnswer={handleSpeakAnswer} {...sharedProps} />;
  }
};


export default PreguntaHandler;
