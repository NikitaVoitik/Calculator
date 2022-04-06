const signs = ['+', '-', '*', '/'];
const verdicts = ['error', 'Infinity', 'NaN', 'ты чмо'];

let expression = '0';

const writeToInput = () => {
    const input = document.forms.form.field;
    expression = String(expression);
    const length = expression.length;
    input.value = expression.substr(Math.max(0, length - 15), Math.min(length, 15));
}

const addSymbol = (symbol) => {
    if (expression === '0' && !signs.find(item => item === symbol) || verdicts.find(item => item === expression)) {
        expression = '';
    }
    if (symbol === '.' && isNaN(expression[expression.length - 1])) {
        expression += '0';
    }
    if (signs.find(item => item === symbol) && signs.find(item => item === expression[expression.length - 1])) {
        if (symbol === '-') {
            expression += '(';
        } else {
            expression = expression.slice(0, length - 1);
        }
    }
    expression += symbol;
    writeToInput();
}

const deleteSymbol = () => {
    if (verdicts.find(item => item === expression)) {
        expression = '0';
        writeToInput();
        return;
    }
    expression = expression.slice(0, expression.length - 1);
    if (!expression.length) {
        addSymbol('0');
    } else {
        writeToInput();
    }
}

const deleteAllSymbols = () => {
    expression = '0';
    writeToInput();
}

const calculate = () => {
    try {
        expression = eval(expression);
    } catch (error) {
        expression = 'ты чмо';
    }
    writeToInput();
}