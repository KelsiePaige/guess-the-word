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
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

// Generates random word for game
const getWord = async function () {
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await request.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

// Starts game
getWord();

// Displays placeholder symbols for each letter
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};


guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    //Empty message paragraph
    message.innerText = "";
    //Grabs the entered input
    const guess = letter.value;
    // Validates single letter input
    const greatGuess = validate(guess);

    if (greatGuess) {
        makeGuess(guess);
    }
    letter.value = "";
});

// Checks if player inputs a valid character 
const validate = function (input) {
    const acceptedLetter = /[a-zA-z]/;
    // Checks for an empty input
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    // Checks for multiple letter input
    } else if (input.length > 1) {
        message.innerText = "Please enter one letter at a time.";
    // Checks for inputs other than letters (special characters or numbers)
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
        countGuessesRemaining(guess);
        playerGuesses();
        updateWordInProgress(guessedLetters);
    }
};

// Shows the guessed letters
const playerGuesses = function () {
    guessedLettersList.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};

// Updates word in progress to replace symbols with the correct letters guessed
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

// Counts the remaining guesses the player has
const countGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, there is no ${guess} in the word.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Great guess! There is a ${guess} in the word.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>`;
        startOver();
    } else if (remainingGuesses === 1) {
        guessCount.innerText = `${remainingGuesses}`;
    } else {
        guessCount.innerText = `${remainingGuesses} guesses`;
    }
};

// Checks if the player won
const checkForWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed the correct word! Congrats!</p>';
        
        startOver();
    }   
};

// Removes guess button to show play again button
const startOver = function () {
    guessButton.classList.add("hide");
    remaining.classList.add("hide");
    guessedLettersList.classList.add("hide");
    button.classList.remove("hide");
};

// Allows player to play again when the button is pressed
button.addEventListener("click", function () {
    // Resets original values
    message.classList.remove("win");
    message.innerText = "";
    guessedLettersList.innerHTML = "";
    remainingGuesses = 8;
    guessedLetters = [];
    guessCount.innerText = `${remainingGuesses} guesses`;

    // Shows guess button and removes play again button
    guessButton.classList.remove("hide");
    remaining.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
    button.classList.add("hide");

    // Grabs a new word
    getWord();
});


