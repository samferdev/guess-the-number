// Global variables
const guessInput = document.getElementById('guessInput');
const result = document.getElementById('result');

let randomNumber = Math.floor(Math.random() * 100) + 1;
let attemptsLeft = 10;

// Function to provide tips based on user's guess
function giveTips(userGuess) {
    if (userGuess > randomNumber) {
        return "The number is lower than " + userGuess + '.';
    } else if (userGuess < randomNumber) {
        return "The number is higher than " + userGuess + '.';
    }
    return "";
}

// Main function to check the user's guess
function checkGuess() {
    const userGuess = parseInt(guessInput.value);
    
    // Validate user input
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        result.textContent = "Please enter a valid number between 1 and 100.";
        return;
    }
    
    attemptsLeft--;
    
    // Check if the guess is correct
    if (userGuess === randomNumber) {
        result.textContent = 'Congratulations! You guessed the number!';
        celebrateWin();
        disableInputs();
    } else if (attemptsLeft === 0) {
        result.textContent = `Sorry, you ran out of attempts. The number was ${randomNumber}`;
        disableInputs();
    } else {
        const tip = giveTips(userGuess);
        result.textContent = `Try again! ${tip} You have ${attemptsLeft} ${attemptsLeft === 1 ? 'attempt' : 'attempts'} left.`;
    }
    updateAttemptsList(userGuess);
    guessInput.value = '';
    guessInput.focus();
}

// Function to provide a tip without using an attempt
function getTip() {
    const userGuess = parseInt(guessInput.value);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        result.textContent = "Please enter a valid number between 1 and 100.";
    } else {
        const difference = Math.abs(randomNumber - userGuess);
        let tip = giveTips(userGuess);
        
        // Provide additional feedback based on how close the guess is
        if (difference <= 5) {
            tip += " You're very close!";
        } else if (difference <= 10) {
            tip += " You're getting warmer.";
        } else if (difference <= 20) {
            tip += " You're in the ballpark.";
        } else {
            tip += " You're quite far off.";
        }
        
        result.textContent = tip;
    }
    guessInput.value = '';
    guessInput.focus();
}

// Function to celebrate when the user wins
function celebrateWin() {
    const container = document.querySelector('.container');
    container.style.animation = 'celebrate 1s ease-in-out';
    
    createConfetti();

    // Remove confetti and reset animation after 3 seconds
    setTimeout(() => {
        const confettiElements = document.querySelectorAll('.confetti-piece');
        confettiElements.forEach(c => c.remove());
        container.style.animation = '';
    }, 3000);
}

// Function to create confetti effect
function createConfetti() {
    const confettiCount = 100;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const confettiContainer = document.querySelector('.confetti');

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        confetti.style.animationDuration = `${Math.random() * 2 + 3}s`;
        confettiContainer.appendChild(confetti);
    }
}

// Function to disable inputs after game ends
function disableInputs() {
    guessInput.disabled = true;
    document.querySelector('button[onclick="checkGuess()"]').disabled = true;
    document.querySelector('button[onclick="getTip()"]').disabled = true;
}

// Function to reset the game
function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attemptsLeft = 10;
    result.textContent = '';
    guessInput.disabled = false;
    document.querySelector('button[onclick="checkGuess()"]').disabled = false;
    document.querySelector('button[onclick="getTip()"]').disabled = false;
    guessInput.value = '';
    guessInput.focus();
    document.getElementById('attempts-list').innerHTML = '';
    document.getElementById('attempts-number').textContent = 'Attempts left: 10';
}

// Event listener for Enter key
guessInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// Event listener for DOMContentLoaded to set up the game
document.addEventListener('DOMContentLoaded', () => {
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Game';
    resetButton.onclick = resetGame;
    resetButton.id = 'resetButton';
    document.querySelector('.container').appendChild(resetButton);
    createAttemptsList();
});

// Function to create the attempts list
function createAttemptsList() {
    const attemptsContainer = document.getElementById('attemptsContainer');
    const attemptsList = document.getElementById('attempts-list');
    const attemptsNumber = document.getElementById('attempts-number');
    attemptsNumber.textContent = 'Attempts left: 10';
}

// Function to update the attempts list
function updateAttemptsList(guess) {
    const attemptsList = document.getElementById('attempts-list');
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span class="guess">Guess: ${guess}</span><span class="attempt-number">Attempt ${10 - attemptsLeft}</span>`;
    attemptsList.insertBefore(listItem, attemptsList.firstChild);

    const attemptsNumber = document.getElementById('attempts-number');
    attemptsNumber.textContent = `Attempts left: ${attemptsLeft}`;
}

// Function to toggle the visibility of attempts list
function toggleAttempts() {
    const attemptsContainer = document.getElementById('attemptsContainer');
    attemptsContainer.style.display = attemptsContainer.style.display === 'none' ? 'block' : 'none';
}

// Function to display advanced math tips
function brain() {
    const popupWindow = document.createElement('div');
    popupWindow.className = 'popup-window';
    popupWindow.innerHTML = `
        <h2>Math Tips about ${randomNumber}</h2>
        <ul>
            <li>Factors: ${getFactors(randomNumber).join(', ')}</li>
            <li>Is Prime: ${isPrime(randomNumber) ? 'Yes' : 'No'}</li>
            <li>Square Root: ${Math.sqrt(randomNumber).toFixed(2)}</li>
            <li>Squared: ${randomNumber * randomNumber}</li>
            <li>Cubed: ${Math.pow(randomNumber, 3)}</li>
            <li>Binary: ${randomNumber.toString(2)}</li>
            <li>Hexadecimal: ${randomNumber.toString(16).toUpperCase()}</li>
            <li>Octal: ${randomNumber.toString(8)}</li>
            <li>Absolute Value: ${Math.abs(randomNumber)}</li>
            <li>Nearest Integer: ${Math.round(randomNumber)}</li>
            <li>Ceiling: ${Math.ceil(randomNumber)}</li>
            <li>Floor: ${Math.floor(randomNumber)}</li>
            <li>Sine: ${Math.sin(randomNumber).toFixed(4)}</li>
            <li>Cosine: ${Math.cos(randomNumber).toFixed(4)}</li>
            <li>Tangent: ${Math.tan(randomNumber).toFixed(4)}</li>
            <li>Logarithm (base 10): ${Math.log10(randomNumber).toFixed(4)}</li>
            <li>Natural Logarithm: ${Math.log(randomNumber).toFixed(4)}</li>
            <li>Exponential (e^x): ${Math.exp(randomNumber).toFixed(4)}</li>
            <li>Is Even: ${randomNumber % 2 === 0 ? 'Yes' : 'No'}</li>
            <li>Is Odd: ${randomNumber % 2 !== 0 ? 'Yes' : 'No'}</li>
            <li>Sum of Digits: ${sumOfDigits(randomNumber)}</li>
            <li>Reverse: ${reverseNumber(randomNumber)}</li>
            <li>Is Palindrome: ${isPalindrome(randomNumber) ? 'Yes' : 'No'}</li>
            <li>Fibonacci Sequence Position: ${findFibonacciPosition(randomNumber)}</li>
        </ul>
        <button id="closePopupBtn">Close</button>
    `;
    document.body.appendChild(popupWindow);

    // Add event listener to close popup when clicking the close button
    document.getElementById('closePopupBtn').addEventListener('click', closePopup);

    // Add event listener to close popup when clicking outside
    document.addEventListener('click', closePopupOutside);
}

// Function to close the popup window
function closePopup() {
    const popupWindow = document.querySelector('.popup-window');
    if (popupWindow) {
        popupWindow.style.display = 'none';
        document.removeEventListener('click', closePopupOutside);
        popupWindow.remove();
    }
}

// Function to close the popup when clicking outside
function closePopupOutside(event) {
    const popupWindow = document.querySelector('.popup-window');
    if (popupWindow && !popupWindow.contains(event.target) && event.target.id !== 'brain') {
        closePopup();
    }
}

// Helper function to get factors of a number
function getFactors(num) {
    const factors = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            factors.push(i);
            if (i !== num / i) {
                factors.push(num / i);
            }
        }
    }
    return factors.sort((a, b) => a - b);
}

// Helper function to check if a number is prime
function isPrime(num) {
    for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if (num % i === 0) return false;
    }
    return num > 1;
}

// Helper function to calculate sum of digits
function sumOfDigits(num) {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}

// Helper function to reverse a number
function reverseNumber(num) {
    return parseInt(num.toString().split('').reverse().join(''));
}

// Helper function to check if a number is a palindrome
function isPalindrome(num) {
    return num === reverseNumber(num);
}

// Helper function to find Fibonacci sequence position
function findFibonacciPosition(num) {
    let a = 0, b = 1, position = 0;
    while (b < num) {
        [a, b] = [b, a + b];
        position++;
    }
    return b === num ? position + 1 : 'Not in sequence';
}

// Commented out functions that might be used in the future
/*function closeTip(resetGame = false) {
    const tipsContainer = document.querySelector('.tips-html');
    tipsContainer.style.display = 'none';
    
    if (resetGame) {
        resetGameAndCloseTips();
    }
}

function resetGameAndCloseTips() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    updateTip(); // Assuming this function exists to update the tip content
    tipsContainer.close(); // Close the tips.html window
}
*/
