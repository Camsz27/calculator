const operation = document.querySelector('.operation');
const result = document.querySelector('.result');
const buttons = document.querySelectorAll('.button');
const multiplication = document.querySelector('.multiplication');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('#equal');
const deleteButton = document.querySelector('#del');
const ceButton = document.querySelector('#ce');
const cButton = document.querySelector('#c');

let operator = add;
let a = 0;
let b = 0;
let countSigns = 0;

buttons.forEach(button => button.addEventListener('click', change));

equal.removeEventListener('click', change);
equal.addEventListener('click', showResult);

deleteButton.removeEventListener('click', change);
deleteButton.addEventListener('click', del);

cButton.removeEventListener('click', change);
cButton.addEventListener('click', clear);

ceButton.removeEventListener('click', change);
ceButton.addEventListener('click', clearLast);

window.addEventListener('keydown', press);

function press(e) {
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`)
    key.click();
}

function change(e) {
    let text = operation.textContent + this.textContent
    if(this.getAttribute('class').includes('operator')) {
        operator = eval(this.id);
        countSigns++;
        if (countSigns > 1) {
            alert("Only one operation at a time can be carried out");
        }
    }
    if (text.length < 18) {
       operation.textContent = text; 
    } else {
        alert("Operation can't be longer than 18 digits");
    }
}

function showResult(){
    let answer = operate(operator,a,b);
    console.log(Math.round(answer));
    if (Math.round(answer).toString().length > 11) {
        alert("Answer can't be longer than 11 digits");
    } else if (answer.toString().length > 11) {
        result.textContent = answer.toString().slice(0, 11);
        operation.textContent = answer.toString().slice(0, 11);
    } else {
        result.textContent = answer;
        operation.textContent = answer;
    }
    b = 0;
    countSigns = 0;
}

function add(a, b) {
    a = Number(a);
    b = Number(b);
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
    let ans = findNums();
    a = ans[0];
    b = ans[1];
    return operator(a, b);
}

function findNums() {
    let txt = operation.textContent;
    let pos = txt.search('[x+\/-]');
    let num1 = txt.slice(0,pos);
    let num2 = txt.slice(pos+1);
    if(pos == -1){
        num1 = txt;
        num2 = 0;
    }
    return [num1, num2];
}

function del() {
    operation.textContent = operation.textContent.slice(0,operation.textContent.length-1);
}

function clear(){
    operation.textContent = '';
}

function clearLast() {
    let pos = operation.textContent.search('[x+\/-]');
    if (pos === operation.textContent.length - 1) {
        clear();
    }
    operation.textContent = operation.textContent.slice(0, pos+1);
}