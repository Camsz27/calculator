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


buttons.forEach(button => button.addEventListener('click', change));

equal.removeEventListener('click', change);
equal.addEventListener('click', showResult);

deleteButton.removeEventListener('click', change);
deleteButton.addEventListener('click', del);

cButton.removeEventListener('click', change);
cButton.addEventListener('click', clear);

ceButton.removeEventListener('click', change);
ceButton.addEventListener('click', clearLast);

window.addEventListener('keydown', practice);

function practice(e) {
    const key = document.querySelector(`button[data-key="${e.keyCode}"]`)
    key.click();
}

function change(e) {
    if(this.getAttribute('class').includes('operator')) {
        operator = eval(this.id);
    }
    operation.textContent = operation.textContent + this.textContent;
}

function showResult(){
    result.textContent = operate(operator,a,b);
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
    let ans;
    ans = findNums();
    console.log(ans);
    a = ans[0];
    b = ans[1];
    console.log(a,b);
    console.log(operator);
    return operator(a, b);
}

function findNums() {
    let txt = operation.textContent;
    let pos = txt.search('[x+\/-]');
    let num1 = txt.slice(0,pos);
    let num2 = txt.slice(pos+1);
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
    console.log(pos);
    operation.textContent = operation.textContent.slice(0, pos+1);
}