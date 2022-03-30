let signs = {
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
}

let expression = '0';

let writeToInput = () => {
    let input = document.forms.form.field;
    expression = String(expression);
    let length = expression.length;
    input.value = expression.substr(Math.max(0, length - 15), Math.min(length, 15));
}

let addSymbol = (number) => {
    if (expression === '0')
        expression = '';
    if (number === '.' && isNaN(expression[expression.length - 1])) {
        expression += '0';
    }
    expression += number;
    writeToInput();
}

let deleteSymbol = () => {
    expression = expression.substr(0, expression.length - 1);
    if (!expression.length) {
        addSymbol('0');
    }
    else {
        writeToInput();
    }
}

let deleteAllSymbols = () => {
    expression = '0';
    writeToInput();
}

let checkExpression = () => {
    let kolBraces = 0;
    for (let i = 0; i < expression.length; i++) {
        if (expression[i] !== '(' && expression[i] !== ')')
            continue;
        kolBraces+= (expression[i] === '(') ? 1 : -1;
        if (i > 0) {
            if (expression[i] === expression[i - 1])
                continue;
            if (expression[i] === '('&& !(expression[i - 1] in signs)) {
                console.log(expression[i - 1]);
                return false;
            }
            if (expression[i] === ')'&& expression[i - 1] !== '.' && isNaN(expression[i - 1])) {
                return false;
            }
        }
        else if (i < expression.length - 1){
            if (expression[i] === expression[i + 1])
                continue;
            if (expression[i] === '(' && isNaN(expression[i + 1])){
                return false;
            }
            if (expression[i] === ')' && !(expression[i + 1] in signs)){
                return false;
            }
        }
    }
    return !kolBraces;
}

/*
( * + - / '(' ( 0 1 2 3 4 5 6 7 8 9
) 0 1 2 3 4 5 6 7 8 9 .  ')' ) * + - /
 */

let calculate = () => {
    if (!checkExpression()){
        expression = 'error';
        writeToInput();
        return;
    }
    expression = eval(expression);
    writeToInput();
}