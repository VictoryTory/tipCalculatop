'use strict';

const billInput = document.querySelector('#billInput');
const personInput = document.querySelector('#personInput');
const tips = document.querySelectorAll('button');
const tipCustom = document.querySelector('.tip-input')
const tipPerPerson = document.querySelector('.amount-person');
const totalPerPerson = document.querySelector('.total-person');
const btnReset = document.querySelector('.btn-reset');
const error = document.querySelector('.error');
const personLabel = document.querySelector('.person-label');


billInput.addEventListener('input', billInputFun);
personInput.addEventListener('input', personInputFun);
tips.forEach(function (val){
    val.addEventListener("click", handleClick);
});
tipCustom.addEventListener('input', tipInputFun);
btnReset.addEventListener('click', btnResetFun);

billInput.value = "0,0";
personInput.value = "";
tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);

let billValue = 0;
let peopleValue = 0;
let tipValue = 0;

function billInputFun() {
    billValue = parseFloat(billInput.value)
    calculateTip();
}

function personInputFun() {
    peopleValue = parseFloat(personInput.value)

    if (peopleValue < 1) {
        error.style.display = "flex";
        personLabel.style.display = "none";
    } else {
        error.style.display = "none";
        personLabel.style.display = "flex";
    }
    calculateTip();
}

function tipInputFun() {
    tipValue = parseFloat(tipCustom.value) / 100;
    tips.forEach(function (val) {
        val.classList.remove("active-tip");
    });
    calculateTip();
}

function handleClick(event) {
    tips.forEach(function (val) {
        val.classList.remove("active-tip");
        if(event.target.innerHTML === val.innerHTML) {
            val.classList.add("active-tip");
            tipValue = parseFloat(val.innerHTML) / 100;
        }
    });
    calculateTip();
}

function calculateTip() {
    if (peopleValue >= 1) {
        let tipAmount = (billValue * tipValue) / peopleValue;
        let total = tipAmount + (billValue / peopleValue);
        tipPerPerson.innerHTML = "$" + tipAmount.toFixed(2);
        totalPerPerson.innerHTML = "$" + total.toFixed(2);
    }
}

function btnResetFun() {
    billInput.value = "";
    personInput.value = "";
    tipCustom.value = "";
    tipPerPerson.innerHTML = "$0.00";
    totalPerPerson.innerHTML = "$0.00";
}