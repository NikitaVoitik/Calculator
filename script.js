//const signs = ['+', '-', '*', '/'];
const signs = {
    '+' : '+',
    '-' : 1,
    '/' : 2,
    '*' : 3,
}
const verdicts = ['error', Infinity, NaN];

let expression = '0';

const writeToInput = () => {
    const input = document.forms.form.field;
    expression = String(expression);
    const length = expression.length;
    input.value = expression.substr(Math.max(0, length - 15), Math.min(length, 15));
}

const addSymbol = (symbol) => {
    const length = expression.length;
    console.log(symbol, symbol in signs);
    if ((expression === '0' && !(symbol in signs)) || expression in verdicts)
        expression = '';
    if (symbol === '.' && isNaN(expression[length - 1])) {
        expression += '0';
    }
    if (symbol in signs && expression[length - 1] in signs) {
        expression = expression.slice(0, length - 1);
    }
    expression += symbol;
    writeToInput();
}

const deleteSymbol = () => {
    expression = expression.slice(0, expression.length - 1);
    if (!expression.length) {
        addSymbol('0');
    } else {
        if (expression in verdicts) {
            expression = '0';
        }
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
        if (expression[i] in signs) {
            if (!i || i === expression.length - 1 || isNaN(expression[i - 1]) || isNaN(expression[i + 1])) {
                return false;
            }
        }
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
            if (expression[i] === expression[i + 1]) {
                continue;
            }
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