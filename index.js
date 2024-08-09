const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;

        if (buttonValue === 'C') {
            clearDisplay();
        } else if (buttonValue === '=') {
            calculateResult();
        } else if (isOperator(buttonValue)) {
            setOperator(buttonValue);
        } else {
            appendNumber(buttonValue);
        }
    });
});

function appendNumber(number) {
    if (currentInput === '' && number === '.') {
        currentInput = '0.';
    } else if (currentInput.includes('.') && number === '.') {
        return;
    } else {
        currentInput += number;
    }
    updateDisplay(currentInput);
}

function setOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculateResult();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculateResult() {
    if (previousInput === '' || currentInput === '') return;

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay(currentInput);
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay('0');
}

function updateDisplay(value) {
    display.value = value;
}

function isOperator(value) {
    return value === '+' || value === '-' || value === '*' || value === '/';
}
