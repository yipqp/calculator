const mainDisplay = document.querySelector("#bottom-display");
const topDisplay = document.querySelector("#top-display");
const numbers = document.querySelectorAll(".numbers"); // includes numbers, +/-, decimal
const operations = document.querySelectorAll(".operations");
const divideButton = document.querySelector("#divide");
const multiplyButton = document.querySelector("#multiply");
const subtractButton = document.querySelector("#subtract");
const addButton = document.querySelector("#add");
const equalButton = document.querySelector("#equals");
const deleteButton = document.querySelector("#delete");
const percentButton = document.querySelector("#percent");
const clear = document.querySelector("#clear");

let prevValue = "";
let currentValue = "0";
let operationSymbol = "";
let currentOperator; // function
let waitingForInput = false;
let equalClicked = false;

numbers.forEach(button => {
    button.addEventListener("click", setCurrentValue);
});

operations.forEach(operator => {
    operator.addEventListener("click", updateOperations);
});

equalButton.addEventListener("click", () => {
    if (equalClicked || prevValue === "") return;
    equalClicked = true;
    updateValues();
});

addButton.addEventListener("click", () => storeOperator(add));
subtractButton.addEventListener("click", () => storeOperator(subtract));
multiplyButton.addEventListener("click", () => storeOperator(multiply));
divideButton.addEventListener("click", () => storeOperator(divide));
percentButton.addEventListener("click", getPercentage);
deleteButton.addEventListener("click", deleteLastDigit);
clear.addEventListener("click", clearAll);

function setCurrentValue() { 
    waitingForInput = false;
    const pressed = this.id;
    if (currentValue === "0") {
        if (pressed === "-") {
            return; 
        } else if (pressed === ".") {
            currentValue += pressed;
        } else {
            currentValue = pressed;
        }
    } else if (currentValue.length < 17) {
        if (pressed === "." && currentValue.includes(".")) {
            return;
        }
        if (pressed === "-") {
            currentValue.includes("-") ? currentValue = currentValue.slice(1) : currentValue = pressed + currentValue;       
        } else {
            currentValue += pressed; 
        }
    }
    updateMainDisplay();
}

function updateMainDisplay() {
    mainDisplay.textContent = currentValue;
}

function updateTopDisplay() {
    topDisplayMessage = `${prevValue} ${operationSymbol} `;
    if (equalClicked) {
        topDisplayMessage += `${currentValue} =`; 
    }
    topDisplay.textContent = topDisplayMessage;
}

function updateOperations() {
    equalClicked = false;
    operationSymbol = this.textContent;
    updateValues();
}

function updateValues() {
    calculate();
    updateTopDisplay();
    if (!waitingForInput) {     
        prevValue = currentValue; 
        currentValue = "0";
    }
    waitingForInput = true; 
}

function calculate() {
    if (currentOperator === undefined || waitingForInput) return; 
    if (currentOperator === divide && currentValue === "0") {
        mainDisplay.textContent = "don't do that.";
    } else {
        currentValue = round(operate(currentOperator, prevValue, currentValue));
        updateMainDisplay();
    }
}

const add = (a, b) => +a + +b; 
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, a, b) {
    return operator(a, b);
}

function storeOperator(operator) {
    currentOperator = operator;
} 

function getPercentage() {
    currentValue *= 0.01;
    currentValue = round(currentValue);
    updateMainDisplay();
}

function deleteLastDigit() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, currentValue.length - 1);   
    } else {
        currentValue = "0";
    }
    updateMainDisplay();
}

function round(value) {
    value = +value.toFixed(13);
    value = value.toString();
    return value;
}

function clearAll() {
    mainDisplay.textContent = "0";
    topDisplay.textContent = "";
    topDisplayMessage = "";
    currentValue = "0";
    prevValue = "";
    operationSymbol = "";
    equalClicked = false;
    currentOperator = undefined;
    waitingForInput = false;
}