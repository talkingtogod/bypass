// Unicode replacements for vowels
const vowelMap = {
    "a": "а", "e": "е", "i": "𝗂", "o": "о", "u": "υ",
    "A": "А", "E": "Е", "I": "𝗜", "O": "О", "U": "𝒰"
};

// Function to modify text
function modifyText() {
    let input = document.getElementById("inputWord").value;
    let output = input.split('').map(char => vowelMap[char] || char).join('');
    document.getElementById("outputText").textContent = output || "Your fancy text will appear here...";
}

// Function to copy text when tapped/clicked
function copyText() {
    let text = document.getElementById("outputText").textContent;
    
    if (text !== "Your bypassed word will appear here...") {
        navigator.clipboard.writeText(text).then(() => {
            let copyMessage = document.getElementById("copyMessage");
            copyMessage.style.opacity = 1;
            setTimeout(() => copyMessage.style.opacity = 0, 1000);
        });
    }
}
