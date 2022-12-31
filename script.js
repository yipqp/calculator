const mainDisplay = document.querySelector("#bottom-display");
const topDisplay = document.querySelector("#top-display");
const numbers = document.querySelectorAll(".numbers"); // includes numbers, +/-, decimal
const operations = document.querySelectorAll(".operations");
const divideButton = document.querySelector("#divide");
const multiplyButton = document.querySelector("#multiply");
const subtractButton = document.querySelector("#subtract");
const addButton = document.querySelector("#add");
const equalButton = document.querySelector("#equals");
const clear = document.querySelector("#clear");
let prevValue = "0";
let currentValue = "0";
let operationSymbol = "";
let currentOperator; // function
let isOperating = false;

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
    if (currentValue !== "0") {
        topDisplayMessage += `${currentValue} =`; 
    }
    topDisplay.textContent = topDisplayMessage;
}

clear.addEventListener("click", allClear);

function allClear() {
    mainDisplay.textContent = "0";
    topDisplay.textContent = "";
    currentValue = "0";
    prevValue = "";
    isOperating = false;
    currentOperator = undefined;
}

operations.forEach(operator => {
    operator.addEventListener("click", updateValues);
});

function updateValues() {
    operationSymbol = this.textContent;
    if (isOperating) {
        calculate();
    } else {   
        prevValue = currentValue;     
        updateMainDisplay();
        currentValue = "0";
        isOperating = true;        
    }
    updateTopDisplay();
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

equalButton.addEventListener("click", calculate);

function calculate() {
    updateTopDisplay(); 
    if (currentOperator !== undefined) {
        currentValue = operate(currentOperator, prevValue, currentValue).toString();
        if (currentValue.length > 17) { // no long decimals
            currentValue = currentValue.slice(0, 17);
        }
    } 
    updateMainDisplay();
    prevValue = "0";
    isOperating = false;
}