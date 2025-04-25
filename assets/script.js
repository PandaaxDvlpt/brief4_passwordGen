// Éléments DOM
const uppercaseCheckbox = document.getElementById('uppercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const lowercaseCheckBox = document.getElementById('lowercase');
const hind = document.getElementById('hind');

// Event Listeners
document.getElementById('generateBtn').addEventListener('click', generatePassword);
hind.addEventListener('click', function() {
    hind.style.color = "black";
    hind.style.fontSize = "20px";
    hind.style.fontWeight = "bold";
    hind.style.textAlign = "center";
    hind.style.marginTop = "10px";
    hind.style.padding = "10px";
});

// Fonction pour vérifier la force du mot de passe
function isGood(password) {
    let regex = new Array();
    regex.push(/[a-z]/);
    regex.push(/[A-Z]/);
    regex.push(/[0-9]/);
    regex.push(/[!@#$%^&*()_\-+=[\]{};:,./<>?~]/);
    
    let score = 0;
    for(let i = 0; i < regex.length; i++) {
        if(regex[i].test(password)) {
            score++;
        }
    }

    let force = "";
    switch(score) {
        case 0:
        case 1:
        case 2:
            force = "Small";
            break;
        case 3:
            force = "Mid";
            break;
        case 4:
            force = "High";
            break;
    }
    hind.innerHTML = force;

    if(score === 4) {
        hind.style.background = "green";
        hind.style.fontSize = "20px";
    } else if(score === 3) {
        hind.style.background = "orange";
        hind.style.fontSize = "20px";
    } else if(score === 2 || score === 1 || score === 0) {
        hind.style.background = "red";
        hind.style.fontSize = "20px";
    }
}

// Fonction principale de génération de mot de passe
function generatePassword() {
    const length = parseInt(document.getElementById('length').value);
    const display = document.getElementById('passwordDisplay');

    if (isNaN(length) || length < 12 || length > 128) {
        display.textContent = "Veuillez entrer une longueur entre 12 et 128.";
        return;
    }

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{};:,.<>?/~';

    let chars = '';
    if (lowercaseCheckBox.checked) chars += lowercase;
    if (uppercaseCheckbox.checked) chars += uppercase;
    if (numbersCheckbox.checked) chars += numbers;
    if (symbolsCheckbox.checked) chars += symbols;

    if (chars === '') {
        display.textContent = "Veuillez sélectionner au moins un type de caractère.";
        return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * chars.length);
        password += chars.charAt(index);
    }

    display.textContent = password;
    isGood(password);
}
