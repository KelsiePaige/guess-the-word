// The unordered list where the player's guessedletters will appear.
const guessedLetters = document.querySelector(".guessed-letters");
// The button with the text "Guess!" in it.
const guess = document.querySelector(".guess");
// The text input where the player will guess a letter.
const letter = document.querySelector(".letter");
// The empty paragraph where the word in progress will apppear.
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const remainingGuesses = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const guessCount = document.querySelector("span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const button = document.querySelector(".play-again");
// Starting word for testing
let word = "magnolia";

const eachLetter = function (word) {
    const letterArray = [];
    for (const letter of word) {
        letterArray.push("●");
    }
    wordInProgress.innerText = letterArray.join("");
    
};

eachLetter(word);