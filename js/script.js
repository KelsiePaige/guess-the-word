// The unordered list where the player's guessedletters will appear.
const guessedLettersList = document.querySelector(".guessed-letters");
// The button with the text "Guess!" in it.
const guessButton = document.querySelector(".guess");
// The text input where the player will guess a letter.
const letter = document.querySelector(".letter");
// The empty paragraph where the word in progress will apppear.
const wordInProgress = document.querySelector(".word-in-progress");
// The paragraph where the remaining guesses will display.
const remaining = document.querySelector(".remaining");
// The span inside the paragraph where the remaining guesses will display.
const guessCount = document.querySelector("span");
// The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
// The hidden button that will appear prompting the player to play again.
const button = document.querySelector(".play-again");
// Starting word for testing
const word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;


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
        message.innerText = "Oops! Looks like you already guessed that letter. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        playerGuesses();
        countGuessesRemaining(guess);
        updateWordInProgress(guessedLetters);
    }
};

const playerGuesses = function () {
    guessedLettersList.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter.toUpperCase());
        } else {
            showWord.push("●");
        }
    }
    //console.log(showWord);
    wordInProgress.innerText = showWord.join("");
    checkForWin();
};

const countGuessesRemaining = function (guess) {
    if (word.toUpperCase().includes(guess)) {
        message.innerHTML = "Letter included";
    } else {
        message.innerHTML = "Not included";
        remainingGuesses -= 1;
        console.log(remainingGuesses);
    }
    if (remainingGuesses === 0) {
        message.innerHTML = "Game over";
    } else if (remainingGuesses === 1) {
        guessCount.innerHTML = 1; 
        console.log(remainingGuesses);
    } else {
        guessCount.innerHTML = remainingGuesses;
    }
};

const checkForWin = function () {
    if (wordInProgress.innerHTML === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
    }
};

