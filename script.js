const numbers = document.querySelectorAll(".numbers");
const display = document.querySelector("#display");
const clear = document.querySelector("#clear");

numbers.forEach(number => {
    number.addEventListener("click", updateDisplay)
});

function updateDisplay() { 
    const number = this.id;
    let value = display.textContent;
    
    if (value === "0") {
        if (number === "-") return;
        display.textContent = number;
    } else if (value.length < 17) {
        if (number === "." && value.includes(".")) return;
        if (number === "-") {
            value.includes("-") ? value = value.slice(1) : value = number + value;       
        } else {
           value += number; 
        }
        display.textContent = value;
    } 
}

clear.addEventListener("click", e => display.textContent = 0);


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