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

// Function to modify only one letter
function modifyText() {
    let input = document.getElementById("inputWord").value;
    if (!input) return;

    lastWord = input;
    let letters = input.split('');
    
    // Find all valid letters we can replace
    let modifiableIndexes = letters
        .map((char, index) => letterMap[char] ? index : -1)
        .filter(index => index !== -1);

    if (modifiableIndexes.length === 0) {
        document.getElementById("outputText").textContent = input;
        return;
    }

    // Pick the first letter to modify
    modifiedIndex = modifiableIndexes[0];
    letters[modifiedIndex] = letterMap[letters[modifiedIndex]];
    
    modifiedWord = letters.join('');
    document.getElementById("outputText").textContent = modifiedWord;
}

// Function to change the modified letter each time the button is clicked
function changeLetter() {
    if (!lastWord) return;
    
    let letters = lastWord.split('');
    let modifiableIndexes = letters
        .map((char, index) => letterMap[char] ? index : -1)
        .filter(index => index !== -1);

    if (modifiableIndexes.length === 0) return;

    // Move to the next letter in the list
    let currentIndex = modifiableIndexes.indexOf(modifiedIndex);
    let nextIndex = (currentIndex + 1) % modifiableIndexes.length;
    modifiedIndex = modifiableIndexes[nextIndex];

    // Replace only the new letter
    let newLetters = [...letters];
    newLetters[modifiedIndex] = letterMap[letters[modifiedIndex]];

    modifiedWord = newLetters.join('');
    document.getElementById("outputText").textContent = modifiedWord;
}

// Function to copy text when clicked
function copyText() {
    let text = document.getElementById("outputText").textContent;

    // Ensure there's text to copy
    if (text !== "Your modified text will appear here...") {
        navigator.clipboard.writeText(text).then(() => {
            let copyMessage = document.getElementById("copyMessage");
            copyMessage.style.opacity = 1;
            setTimeout(() => copyMessage.style.opacity = 0, 1000);
        });
    }
}

// Add event listener for clicking the output text to copy it
document.getElementById("outputText").addEventListener("click", copyText);

function generateBypass() {
    let input = document.getElementById("bypassInput").value.trim();
    if (!input) return;

    let bypassedText = input.split("").join("​"); // Adds zero-width spaces
    document.getElementById("outputBox").textContent = bypassedText;
}

function copyToClipboard() {
    let text = document.getElementById("outputBox").textContent;
    navigator.clipboard.writeText(text);
    let copyMsg = document.getElementById("copyMessage");
    copyMsg.style.opacity = "1";
    setTimeout(() => { copyMsg.style.opacity = "0"; }, 1000);
}
