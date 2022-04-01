const signs = {
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
}

let expression = '0';

const writeToInput = () => {
    const input = document.forms.form.field;
    expression = String(expression);
    const length = expression.length;
    input.value = expression.substr(Math.max(0, length - 15), Math.min(length, 15));
}

const addSymbol = (number) => {
    if (expression === '0')
        expression = '';
    if (number === '.' && isNaN(expression[expression.length - 1])) {
        expression += '0';
    }
    expression += number;
    writeToInput();
}

const deleteSymbol = () => {
    expression = expression.substr(0, expression.length - 1);
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

const checkExpression = () => {
    let kolBraces = 0;
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] !== '(' && expression[i] !== ')')
            continue;
        kolBraces += (expression[i] === '(') ? 1 : -1;
        if (i > 0) {
            if (expression[i] === expression[i - 1])
                continue;
            if (expression[i] === '(' && !(expression[i - 1] in signs)) {
                return false;
            }
            if (expression[i] === ')' && expression[i - 1] !== '.' && isNaN(expression[i - 1])) {
                return false;
            }
        } else if (i < expression.length - 1) {
            if (expression[i] === expression[i + 1])
                continue;
            if (expression[i] === '(' && isNaN(expression[i + 1])) {
                return false;
            }
            if (expression[i] === ')' && !(expression[i + 1] in signs)) {
                return false;
            }
        }
    }
    return !kolBraces;
}

const calculate = () => {
    if (!checkExpression()) {
        expression = 'error';
        writeToInput();
        return;
    }
    expression = eval(expression);
    writeToInput();
}