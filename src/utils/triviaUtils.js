import LZString from "lz-string";

export const handleShareGoogle = (selectedTrivia, selectedIndex) => {
  return new Promise((resolve, reject) => {
    if (!selectedTrivia) {
      alert("No hay trivia seleccionada para compartir");
      return reject("No trivia selected");
    }

    const json = JSON.stringify(selectedTrivia.questions);
    const compressedQuestions = LZString.compressToBase64(json);
    const formData = new FormData();
    formData.append("entry.361234476", selectedTrivia.name);
    if (selectedTrivia.description) {
      formData.append("entry.177312977", selectedTrivia.description);
    }
    if (selectedTrivia.author) {
      formData.append("entry.1384023895", selectedTrivia.author);
    }
    formData.append("entry.1369331431", compressedQuestions);

    fetch("https://docs.google.com/forms/d/e/1FAIpQLSfS6Wfv3Bs9mX2s8gfBLfvgTrYDb8_dVFBkBZv78G8_ub__oQ/formResponse", {
      method: "POST",
      mode: "no-cors",
      body: formData
    })
    .then(() => {
      const triviasData = JSON.parse(localStorage.getItem("trivia_decks"));
      const updatedTrivias = triviasData.map((trivia, index) => 
        index === parseInt(selectedIndex) ? { ...trivia, canBeExported: false } : trivia
      );
      localStorage.setItem("trivia_decks", JSON.stringify(updatedTrivias));
      alert("Trivia compartida en Google exitosamente!");
      resolve(updatedTrivias);
    })
    .catch((error) => {
      console.error("Error al enviar el formulario", error);
      alert("Error al compartir en Google.");
      reject(error);
    });
  });
};
