const words = [
    { word: 'CHANGE', hint: 'The act of trading' },
    { word: 'PLANT', hint: 'A living organism that grows in the ground' },
    { word: 'COMPUTER', hint: 'An electronic device for processing data' },
    { word: 'PROGRAM', hint: 'A set of instructions for a computer' },
    { word: 'JAVASCRIPT', hint: 'A programming language for web development' }
];

let currentWord;
let scrambledWord;
let attempts = 0;
let timer;
let timeLeft = 15;

function scrambleWord(word) {
    return word.split('').sort(() => Math.random() - 0.5).join('');
}

function startGame() {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex].word;
    scrambledWord = scrambleWord(currentWord);
    document.getElementById('scrambledWord').innerText = scrambledWord;
    document.getElementById('hint').innerText = `Hint: ${words[randomIndex].hint}`;
    document.getElementById('feedback').innerText = '';
    document.getElementById('userInput').value = '';
    document.getElementById('attempts').innerText = 'Attempts: 0';
    attempts = 0;
    timeLeft = 15;
    document.getElementById('restartButton').style.display = 'none';
    startTimer();
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timeLeft').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('feedback').innerText = `Time's up! The word was "${currentWord}".`;
            document.getElementById('restartButton').style.display = 'inline';
        }
    }, 1000);
}

document.getElementById('checkWord').addEventListener('click', function () {
    const userGuess = document.getElementById('userInput').value.toUpperCase();
    attempts++;
    document.getElementById('attempts').innerText = `Attempts: ${attempts}`;

    if (userGuess === currentWord) {
        clearInterval(timer);
        document.getElementById('feedback').innerText = 'Congratulations! You guessed the correct word!';
        document.getElementById('restartButton').style.display = 'inline';
    } else {
        document.getElementById('feedback').innerText = 'Incorrect guess. Try again!';
    }
});

document.getElementById('refreshWord').addEventListener('click', startGame);
document.getElementById('restartButton').addEventListener('click', startGame);

// Start the game when the page loads
startGame();
