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
let hasResult = false;

numbers.forEach(button => {
    button.addEventListener("click", setCurrentValue);
});

function setCurrentValue() { 
    const pressed = this.id;
    if (currentValue === "0") {
        if (pressed === "-") return;
        else if (pressed === ".") currentValue += pressed; 
        else currentValue = pressed;
    } else if (currentValue.length < 17) {
        if (pressed === "." && currentValue.includes(".")) return;
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
    if (hasResult) {
        topDisplayMessage += `${currentValue} =`; 
        hasResult = false;
    }
    topDisplay.textContent = topDisplayMessage;
}

clear.addEventListener("click", allClear);

function allClear() {
    mainDisplay.textContent = "0";
    topDisplayMessage = "";
    topDisplay.textContent = "";
    currentValue = "0";
    prevValue = "";
    operationSymbol = "";
    hasResult = false;
    currentOperator = undefined;
}

operations.forEach(operator => {
    operator.addEventListener("click", updateValues);
});

function updateValues() {
    calculate();
    operationSymbol = this.textContent; 
    prevValue = currentValue; 
    if (!hasResult) {
        updateTopDisplay();
    }  
    currentValue = "0";  
}

const add = function (a, b) {
    return +a + +b;
}

addButton.addEventListener("click", () => storeOperator(add));

const subtract = function (a, b) {
    return a - b;
} 

subtractButton.addEventListener("click", () => storeOperator(subtract));

const multiply = function (a, b) {
    return a * b;
}

multiplyButton.addEventListener("click", () => storeOperator(multiply));

const divide = function (a, b) {
    return a / b;
}

divideButton.addEventListener("click", () => storeOperator(divide));

function operate(operator, a, b) {
    return operator(a, b);
}

function storeOperator(operator) {
    currentOperator = operator;
} 

equalButton.addEventListener("click", () => {
    hasResult = true;
    calculate();
});

deleteButton.addEventListener("click", del);

percentButton.addEventListener("click", getPercentage);

function del() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, currentValue.length - 1);   
    } else {
        currentValue = "0";
    }
    updateMainDisplay();
}

function getPercentage() {
    currentValue *= 0.01;
    currentValue = round(currentValue);
    updateMainDisplay();
}

function round(value) {
    value = +value.toFixed(13);
    value = value.toString();
    return value;
}

function calculate() {
    if (currentOperator === undefined) return; 
    updateTopDisplay(); 
    if (currentOperator === divide && currentValue === "0") { // cannot divide by 0
        mainDisplay.textContent = "don't do that.";
    } else {
        currentValue = round(operate(currentOperator, prevValue, currentValue));
        updateMainDisplay();
    }
}