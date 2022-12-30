const numbers = document.querySelectorAll(".numbers");
const operations = document.querySelectorAll(".operations");
const display = document.querySelector("#bottom-display");
const clear = document.querySelector("#clear");

let prevValue;
let nextValue;
let operator;
let isOperating = false;
let storingNextValue = false;

numbers.forEach(number => {
    number.addEventListener("click", updateDisplay);
});

function updateDisplay() { 
    const pressed = this.id;
    let value = display.textContent;

    if (value === "0") {
        if (pressed === "-") return;
        else if (pressed === ".") value += pressed;
        else value = pressed;
    } else if (value.length < 17) {
        if (pressed === "." && value.includes(".")) return;
        if (pressed === "-") {
            value.includes("-") ? value = value.slice(1) : value = pressed + value;       
        } else {
           value += pressed; 
        }
    }
    
    if (isOperating) {

    }

    display.textContent = value;
}

clear.addEventListener("click", allClear);

function allClear() {
    display.textContent = 0;
    isOperating = false;
    storingNextValue = false;

}

operations.forEach(operator => {
    operator.addEventListener("click", storeValues);
});

function storeValues() {
    prevValue = display.textContent;
    operator = this.id;
    storingNextValue = true;

    if (isOperating) {

    }
    isOperating = true;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
} 

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}