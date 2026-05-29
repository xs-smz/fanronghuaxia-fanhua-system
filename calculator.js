let display = document.getElementById('display');
let expression = '';

function appendNumber(num) {
    expression += num;
    updateDisplay();
}

function appendOperator(op) {
    // Prevent multiple operators in a row
    if (expression === '' || /[+\-*/]$/.test(expression)) {
        return;
    }
    expression += op;
    updateDisplay();
}

function clearDisplay() {
    expression = '';
    updateDisplay();
}

function deleteLastChar() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.value = expression;
}

function calculate() {
    if (expression === '') {
        return;
    }

    try {
        // Evaluate the expression
        let result = Function('"use strict"; return (' + expression + ')')();
        
        // Handle floating point precision issues
        result = Math.round(result * 100000000) / 100000000;
        
        expression = result.toString();
        updateDisplay();
    } catch (error) {
        display.value = 'Error';
        expression = '';
        setTimeout(() => {
            display.value = '';
        }, 1500);
    }
}

// Allow keyboard input
document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Number keys
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    }
    // Operators
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault();
        appendOperator(key);
    }
    // Decimal point
    else if (key === '.') {
        appendNumber(key);
    }
    // Enter or equals
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    // Backspace
    else if (key === 'Backspace') {
        event.preventDefault();
        deleteLastChar();
    }
    // Escape or Clear
    else if (key === 'Escape') {
        event.preventDefault();
        clearDisplay();
    }
});
