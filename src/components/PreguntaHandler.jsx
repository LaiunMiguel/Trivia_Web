import PreguntaConOpciones from './PreguntaConOpciones.jsx';
import Pregunta from './Pregunta.jsx';

const PreguntaHandler = ({
  questionData,
  onAnswerCorrect = () => {},
  onAnswerIncorrect = () => {},
  alreadyResponded,
  isVoiceOn,
  voiceSelected
}) => {

  const speak = (text) => {
    if (voiceSelected === null) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = voiceSelected.lang;
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  };

  const letras = ['A.', 'B.', 'C.', 'D.'];
  
  const handleSpeak = (options) => {
    let fullText = questionData.q

    if (options)  {
        const opcionesConLetras = options.map((op, i) => `${letras[i]}. ${op}`);
        fullText += `. Opciones: ${opcionesConLetras.join(", ")}`;
        if (alreadyResponded) {
          fullText += ". La respuesta es " + questionData.r;
        }
    }
    speak(fullText);
  };
  

  const handleSpeakAnswer = (answer) => {
    speak("La respuesta es" + answer);
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
    alreadyResponded,
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
