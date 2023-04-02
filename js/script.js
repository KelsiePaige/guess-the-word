// The unordered list where the player's guessedletters will appear.
const guessedLettersList = document.querySelector(".guessed-letters");
// The button with the text "Guess!" in it.
const guessButton = document.querySelector(".guess");
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
const word = "magnolia";
const guessedLetters = [];

const eachLetter = function (word) {
    const letterArray = [];
    for (const letter of word) {
        letterArray.push("●");
    }
    wordInProgress.innerText = letterArray.join("");
    
};

eachLetter(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letter.value;
    const greatGuess = validate(guess);

    if (greatGuess) {
        makeGuess(guess);
    }
    letter.value = "";
});

const validate = function (input) {
    const acceptedLetter = /[a-zA-z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter one letter at a time.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Oops! Looks like you already guessed tht letter. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};
