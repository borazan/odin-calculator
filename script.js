function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return Math.round((a / b) * 10) / 10; //Round to 1 floating point
}

function operate(a, operator, b) {
  switch (operator) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
    default:
      return null;
  }
}

// ~~~ SELECTORS ~~~ //
const html = document.querySelector("html");
const head = document.querySelector("head");
const body = document.querySelector("body");
const wrapper = document.querySelector(".wrapper");
const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
const timeDiv = document.querySelector(".time");
var output = display.innerText;
var number;
// ~~~ SELECTORS ~~~ //

function updateTime() {
  var current = new Date();
  var timeVar = current.getHours() + ":" + current.getMinutes();
  timeDiv.innerHTML = timeVar;
}
updateTime();
setInterval(updateTime, 1000);

function createButtons() {
  let keyTexts = [
    "AC",
    "+/-",
    "%",
    "\u00F7",
    "7",
    "8",
    "9",
    "\u00D7",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];
  for (let i = 0; i < 19; i++) {
    let button = document.createElement("div");
    button.classList.add("button");
    button.textContent = keyTexts[i];
    switch (i) {
      case 0:
        button.classList.add("gray");
        break;
      case 1:
        button.classList.add("gray");
        break;
      case 2:
        button.classList.add("gray");
        break;
      case 3:
        button.classList.add("orange");
        button.classList.add("divide");
        break;
      case 7:
        button.classList.add("orange");
        break;
      case 11:
        button.classList.add("orange");
        break;
      case 15:
        button.classList.add("orange");
        break;
      case 16:
        button.classList.add("wider");
        button.classList.add("number");
        break;
      case 18:
        button.classList.add("orange");
        break;
      default:
        button.classList.add("number");
    }
    if (i == 16) button.classList.add("wider");
    buttons.appendChild(button);
  }
}

function read() {
  let text = display.innerText;
  if (text === "") {
    return 0;
  } else if (text.includes(".")) {
    return parseFloat(text);
  } else {
    return parseInt(text);
  }
}

function write(passed) {
  console.log(`write() took in ${input} as input`);
  let input = passed.toString();
  if (input.includes(".")){
    input = input.toFixed(3);
    while (input[input.length-1] == "0"){
      input = input.slice()
    }
    display.innerText = input.toFixed(3);
  } else display.innerText = input;
}

createButtons();

wrapper.addEventListener("click", function (e) {
  if (e.target.classList.contains("button")) {
    if (!e.target.classList.contains("gray"))
      display.innerText += e.target.innerText;
    switch (e.target.innerText) {
      case "AC":
        display.innerText = "";
        break;
      case "+/-":
        if (display.innerText[0] == "-") {
          display.innerText = display.innerText.slice(1);
        } else display.innerText = "-" + display.innerText;
        break;
      case "%":
        write(read() / 10); 
        break;
    }
  }
});
