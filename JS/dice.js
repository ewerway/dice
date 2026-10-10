const playerDiceFirst = document.getElementById("dice-icon-1");
const playerDiceSecond = document.getElementById("dice-icon-2");
const enemyDiceFirst = document.getElementById("dice-icon-3");
const enemyDiceSecond = document.getElementById("dice-icon-4");

const diceRoll = new Audio("./Audio/dice_roll.mp3");
diceRoll.volume = 0.3;

function getRandomValue(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function tableUpdating(result, personN, botN) {
    const table = document.getElementById("table");
    let maxRows = 6n;
    
    if (table.rows.length < maxRows) {
        table.insertRow(1);
        table.rows[1].insertCell(0);
        table.rows[1].insertCell(1);
    }
    else {
        for (let r = maxRows - 1n; r > 1n; r--) {
            table.rows[r].cells[0].innerText = table.rows[r - 1n].cells[0].innerText;
            table.rows[r].cells[1].innerText = table.rows[r - 1n].cells[1].innerText;
        }
    }
    
    table.rows[1].cells[0].innerText = result;
    table.rows[1].cells[1].innerText = `${personN}:${botN}`;
}

function diceThrowing() {
    diceRoll.currentTime = 0;
    diceRoll.play();
    
    let min = 1, max = 6;
    
    let playerNumberFirst = getRandomValue(min, max);
    let playerNumberSecond = getRandomValue(min, max);
    
    let enemyNumberFirst = getRandomValue(min, max);
    let enemyNumberSecond = getRandomValue(min, max);
    
    setDiceIcon(playerDiceFirst, playerNumberFirst);
    setDiceIcon(playerDiceSecond, playerNumberSecond);
    setDiceIcon(enemyDiceFirst, enemyNumberFirst);
    setDiceIcon(enemyDiceSecond, enemyNumberSecond);
    
    getResult(playerNumberFirst + playerNumberSecond, enemyNumberFirst + enemyNumberSecond);
}

function getResult(personN, botN) {
    let result;
    let color;
    
    if (personN > botN) {
        result = "ПОБЕДА";
        color = "rgba(0, 200, 60, 0.25)";
    }
    else if (personN < botN) {
        result = "ПОРАЖЕНИЕ";
        color = "rgba(200, 0, 0, 0.25)";
    }
    else {
        result = "НИЧЬЯ";
        color = "rgba(0,0,0, 0.25)";
    }
    
    const resultText = document.getElementById("result");
    resultText.textContent = result + `: ${personN}:${botN}`;
    resultText.style.backgroundColor = color;
    tableUpdating(result, personN, botN);
}

function setDiceIcon(icon, value)
{
    icon.style.backgroundImage = `url("./Images/Dices/dice_${value}.png")`;
}
