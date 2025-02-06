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

// Function to replace a random letter in both words if the word contains exactly two words
function replaceMultiLettersInWords(input) {
    let words = input.split(' ');
    
    // Loop over each word and replace a random letter
    words = words.map(word => replaceRandomLetterInWord(word));

    return words.join(' ');
}

// Function to replace a random letter in a given word using the letterMap
function replaceRandomLetterInWord(word) {
    // Find all letters in the word that can be replaced using the letterMap
    let modifiableIndexes = [];
    for (let i = 0; i < word.length; i++) {
        if (letterMap[word[i]]) {
            modifiableIndexes.push(i);
        }
    }

    if (modifiableIndexes.length === 0) {
        return word; // Return the word unchanged if no modifiable letters are found
    }

    // Select a random letter to replace
    let randomIndex = modifiableIndexes[Math.floor(Math.random() * modifiableIndexes.length)];
    let letterToReplace = word[randomIndex];
    let replacementLetter = letterMap[letterToReplace];

    // Replace the letter in the word
    word = word.substring(0, randomIndex) + replacementLetter + word.substring(randomIndex + 1);

    return word;
}

// Function to check if the input contains exactly two words
function isTwoWords(input) {
    const words = input.trim().split(' ');
    return words.length === 2;
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
