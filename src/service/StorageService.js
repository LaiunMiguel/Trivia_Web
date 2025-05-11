

class StorageService {

    saveTrivias(trivias) {

        const ids = trivias.map((trivia) => trivia.id);

        localStorage.setItem("Trivia_decks", JSON.stringify(trivias));
        localStorage.setItem("Trivias_IDs", JSON.stringify(ids));
    }

    saveNewTrivias(trivias) {
        const ids = trivias.map((trivia) => trivia.id);

        const triviasData = JSON.parse(localStorage.getItem("Trivia_decks")) || [];
        const Trivias_IDs = JSON.parse(localStorage.getItem("Trivias_IDs")) || [];

        triviasData.push(...trivias);
        Trivias_IDs.push(...ids);

        localStorage.setItem("Trivia_decks", JSON.stringify(triviasData));
        localStorage.setItem("Trivias_IDs", JSON.stringify(Trivias_IDs));
        this.reorderTrivias()

    }

    saveTrivia(trivia) {
        const existingDecks = JSON.parse(localStorage.getItem("local_trivia_decks")) || [];
      
        trivia.id = "local" + existingDecks.length;
        existingDecks.push(trivia);
      
        localStorage.setItem("local_trivia_decks", JSON.stringify(existingDecks));
        return trivia;
    }

    saveImportTrivia(trivia) {
        const existingTrivias = JSON.parse(localStorage.getItem("Trivia_decks")) || [];
        const existingIds = JSON.parse(localStorage.getItem("Trivias_IDs")) || [];

        existingIds.push(trivia.id);
        existingTrivias.push(trivia);
      
        localStorage.setItem("Trivia_decks", JSON.stringify(existingTrivias));
        localStorage.setItem("Trivias_IDs", JSON.stringify(existingIds));
        this.reorderTrivias()
        return trivia;

    }

    saveTempCreation(questions) {
        localStorage.setItem("temp_creation", JSON.stringify(questions));
    }

    loadTempCreation() {
        const tempCreation = JSON.parse(localStorage.getItem("temp_creation"));
        return tempCreation;
    }

    deleteTempCreation() {
        localStorage.removeItem("temp_creation");
    }

    ignoreTrivia(triviaId) {
        const IDs = JSON.parse(localStorage.getItem("Trivias_IDs")) || [];
        IDs.push(triviaId);
        localStorage.setItem("Trivias_IDs", JSON.stringify(IDs));
        
    }

    loadAllTrivias() {
        const triviasData = JSON.parse(localStorage.getItem("Trivia_decks")) || [];
        const triviasLocales = JSON.parse(localStorage.getItem("local_trivia_decks")) || [];

        triviasData.push(...triviasLocales);

        return triviasData;
    }

    loadTrivias() {
        const triviasData = JSON.parse(localStorage.getItem("Trivia_decks")) || [];

        return triviasData;
    }

    loadLocalTrivias() {
        const triviasLocales = JSON.parse(localStorage.getItem("local_trivia_decks")) || [];
        return triviasLocales;
    }

    getTriviaById(triviaId) {
        const triviasData = JSON.parse(localStorage.getItem("Trivia_decks")) || [];
        const trivia = triviasData.find((trivia) => trivia.id === triviaId);
        return trivia;
    }

    getLocalTriviaById(triviaId) {
        const triviasLocales = JSON.parse(localStorage.getItem("local_trivia_decks")) || [];
        const trivia = triviasLocales.find((trivia) => trivia.id === triviaId);
        return trivia;
    }

    markAsResolved(triviaResolved) {
        
        if (triviaResolved.canBeExported) {
            const triviasLocales = JSON.parse(localStorage.getItem("local_trivia_decks"));
            const updatedTriviasLocales = triviasLocales.filter((trivia) => trivia.id !== triviaResolved.id);
            updatedTriviasLocales.push(triviaResolved);
            localStorage.setItem("local_trivia_decks", JSON.stringify(updatedTriviasLocales));
            this.reorderLocalTrivias()
            return updatedTriviasLocales;
        }

            const trivias = JSON.parse(localStorage.getItem("Trivia_decks"));
            const updatedTrivias = trivias.filter((trivia) => trivia.id !== triviaResolved.id);
            updatedTrivias.push(triviaResolved);
            localStorage.setItem("Trivia_decks", JSON.stringify(updatedTrivias));
            this.reorderTrivias()
            return updatedTrivias;

        
        
    }

    triviaExported(exportedTrivia, newId) {
        const triviasLocales = JSON.parse(localStorage.getItem("local_trivia_decks")); 
        const updatedTriviasLocales = triviasLocales.filter((trivia) => trivia.id !== exportedTrivia.id);
        localStorage.setItem("local_trivia_decks", JSON.stringify(updatedTriviasLocales));

        const triviasData = JSON.parse(localStorage.getItem("Trivia_decks")) || [];
        exportedTrivia.id = newId;
        exportedTrivia.canBeExported = false;
        triviasData.push(exportedTrivia);
        localStorage.setItem("Trivia_decks", JSON.stringify(triviasData));

    }

    removeFromTrivias(trivia) {
        if (trivia.canBeExported) {
            const triviasData = JSON.parse(localStorage.getItem("local_trivia_decks"));
            const updatedTrivias = triviasData.filter((t) => t.id !== trivia.id);
            localStorage.setItem("local_trivia_decks", JSON.stringify(updatedTrivias));
        } else {
            const triviasData = JSON.parse(localStorage.getItem("Trivia_decks"));
            const updatedTrivias = triviasData.filter((t) => t.id !== trivia.id);
            localStorage.setItem("Trivia_decks", JSON.stringify(updatedTrivias));
        }
    }

    getIDs() {
        const IDs = JSON.parse(localStorage.getItem("Trivias_IDs")) || [];
        return IDs;
    }

    getSavedIDs() {
        const triviasData = JSON.parse(localStorage.getItem("Trivia_decks")) || [];
        const savedIDs = triviasData.map((trivia) => trivia.id);
        return savedIDs;
    }

    reorderTrivias() {
        const triviasData = JSON.parse(localStorage.getItem("Trivia_decks"));
        const orderedTrivias = triviasData.sort((a, b) => a.id - b.id);
        localStorage.setItem("Trivia_decks", JSON.stringify(orderedTrivias));
    }

    reorderLocalTrivias() {
        const triviasLocales = JSON.parse(localStorage.getItem("local_trivia_decks"));
        const orderedTrivias = triviasLocales.sort((a, b) => {
            const numA = parseInt(a.id.replace(/[^\d]/g, ''), 10);
            const numB = parseInt(b.id.replace(/[^\d]/g, ''), 10);
            
            return numA - numB;
          });
        localStorage.setItem("local_trivia_decks", JSON.stringify(orderedTrivias));
    }

}

export default StorageService;
