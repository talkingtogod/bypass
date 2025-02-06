// Unicode lookalikes for every letter (including capitals and lowercase)
const letterMap = {
    "a": "а", "b": "Ь", "c": "ϲ", "d": "ԁ", "e": "е", "f": "Ϝ",
    "g": "ɡ", "h": "һ", "i": "і", "j": "ј", "k": "κ", "l": "ӏ",
    "m": "м", "n": "ո", "o": "о", "p": "р", "q": "զ", "r": "г",
    "s": "ѕ", "t": "т", "u": "υ", "v": "ν", "w": "ԝ", "x": "х",
    "y": "у", "z": "ᴢ",

    "A": "А", "B": "В", "C": "Ϲ", "D": "Ꭰ", "E": "Е", "F": "Ϝ",
    "G": "Ԍ", "H": "Η", "I": "Ι", "J": "Ј", "K": "Κ", "L": "Ꮮ",
    "M": "Μ", "N": "Ν", "O": "Ο", "P": "Р", "Q": "Ԛ", "R": "Ꭱ",
    "S": "Ѕ", "T": "Τ", "U": "Ս", "V": "Ѵ", "W": "Ԝ", "X": "Χ",
    "Y": "Υ", "Z": "Ζ"
};

let lastWord = ""; // Original word
let modifiedWord = ""; // Modified version
let modifiedIndex = -1; // Index of changed letter

// Function to modify the first replaceable letter
function modifyText() {
    let input = document.getElementById("inputWord").value.trim();
    if (!input) return;

    lastWord = input;
    let letters = input.split('');
    
    // Get all modifiable letter indexes
    let modifiableIndexes = letters
        .map((char, index) => letterMap[char] ? index : -1)
        .filter(index => index !== -1);

    if (modifiableIndexes.length === 0) {
        document.getElementById("outputText").textContent = input;
        return;
    }

    // Pick the first modifiable letter
    modifiedIndex = modifiableIndexes[0];
    letters[modifiedIndex] = letterMap[letters[modifiedIndex]];
    
    modifiedWord = letters.join('');
    document.getElementById("outputText").textContent = modifiedWord;
}

// Function to cycle through modifiable letters
function changeLetter() {
    if (!lastWord) return;
    
    let letters = lastWord.split('');
    let modifiableIndexes = letters
        .map((char, index) => letterMap[char] ? index : -1)
        .filter(index => index !== -1);

    if (modifiableIndexes.length === 0) return;

    // Move to the next letter
    let currentIndex = modifiableIndexes.indexOf(modifiedIndex);
    let nextIndex = (currentIndex + 1) % modifiableIndexes.length;
    modifiedIndex = modifiableIndexes[nextIndex];

    // Replace the new letter
    let newLetters = [...letters];
    newLetters[modifiedIndex] = letterMap[letters[modifiedIndex]];

    modifiedWord = newLetters.join('');
    document.getElementById("outputText").textContent = modifiedWord;
}

// Function to copy text on click
function copyText() {
    let text = document.getElementById("outputText").textContent;

    if (text && text !== "Your modified text will appear here...") {
        navigator.clipboard.writeText(text).then(() => {
            let copyMessage = document.getElementById("copyMessage");
            copyMessage.style.opacity = 1;
            setTimeout(() => copyMessage.style.opacity = 0, 1000);
        });
    }
}

// Wait for DOM to load before adding event listener
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("outputText").addEventListener("click", copyText);
});
