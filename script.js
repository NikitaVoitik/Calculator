const signs = ['+', '-', '*', '/'];
const verdicts = ['error', 'Infinity', 'NaN', 'ты чмо'];

let expression = '0';

const writeToInput = () => {
    const input = document.forms.form.field;
    expression = String(expression);
    const length = expression.length;
    input.value = expression.substr(Math.max(0, length - 15), Math.min(length, 15));
}

const inArray = (elem, array) => {
    console.log(elem, array);
    for(let prop in array){
        if (elem === array[prop]){
            console.log(true);
            return true;
        }
    }
    return false;
}

const addSymbol = (symbol) => {
    const length = expression.length;
    if ((expression === '0' && !inArray(symbol, signs)) || inArray(expression, verdicts)) {
        expression = '';
    }
    if (symbol === '.' && isNaN(expression[length - 1])) {
        expression += '0';
    }
    if (inArray(symbol, signs) && inArray(expression[length - 1], signs)) {
        expression = expression.slice(0, length - 1);
    }
    expression += symbol;
    writeToInput();
}

const deleteSymbol = () => {
    if (inArray(expression, verdicts)) {
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