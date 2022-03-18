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
const evaldisplay = document.querySelector(".evaldisplay");
const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");
const timeDiv = document.querySelector(".time");
const operands = ["+", "-", "\u00F7", "\u00D7"];
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
  let input = passed.toString();
  console.log(`write() took in ${input} as input`);
  if (input.includes(".")) {
    input = parseFloat(input).toFixed(3);
    while (input[input.length - 1] == "0") {
      input = input.slice(0, input.length - 1);
    }
    display.innerText = input;
  } else display.innerText = input;
}

function hasOperands() {
  let text = display.innerText;
  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    if (char == "-" && i == 0) continue;
    else if (operands.includes(char)) return true;
  }
  return false;
}

//ensures safe eval execution to prevent injection
function calculate() {
  let calculation = display.innerText.replace(/[^-\d\u{00F7}\u{00D7}+.]/gu, "");
  calculation = calculation.replace(/[\u{00F7}]/gu, "/"); //replace division
  calculation = calculation.replace(/[\u{00D7}]/gu, "*"); //replace multiply
  //TODO: catch invalid math expressions and show ERROR on display
  try {
    calculation = eval(calculation);
  } catch (e) {
    calculation = "";
  }
  if (calculation != display.innerText) evaldisplay.innerText = calculation;
  else evaldisplay.innerText = "";
  
}
createButtons();

wrapper.addEventListener("click", function (e) {
  if (e.target.classList.contains("button")) {
    if (!e.target.classList.contains("gray") && e.target.innerText != "=")
      display.innerText += e.target.innerText;
    calculate();
    switch (e.target.innerText) {
      case "AC":
        display.innerText = "";
        evaldisplay.innerText = "";
        break;
      case "+/-":
        if (display.innerText[0] == "-") {
          display.innerText = display.innerText.slice(1);
        } else display.innerText = "-" + display.innerText;
        break;
      case "%":
        write(read() / 10);
        break;
      case "=":
        if (evaldisplay.innerText != "") display.innerText = evaldisplay.innerText;
        calculate();
        break;
    }
  }
});
