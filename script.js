let addSymbol = (number) => {
    let input = document.forms.form.field;
    if (input.value === "0")
        input.value = "";
    input.value+= number;
}

let deleteSymbol = () => {
    let input = document.forms.form.field;
    input.value = input.value.substr(0, input.value.length - 1);
    if (!input.value.length)
        addSymbol('0');
}

let deleteAllSymbols = () => {
    let input = document.forms.form.field;
    input.value = '0';
}