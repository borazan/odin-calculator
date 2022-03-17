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
const wrapper = document.querySelector("wrapper");
const display = document.querySelector("display");
const buttons = document.querySelector("buttons");
// ~~~ SELECTORS ~~~ //

function createButtons() {
  for (let i = 0; i < 19; i++) {
    let button = document.createElement("div");
    button.classList.add("button");
    buttons.appendChild(button);
  }
}

wrapper.addEventListener("click", function (e) {
  if (e.target.classList.contains("button")) {
    //TODO: implement functionality
  }
});

wrapper.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("button")) {
    //TODO: hovering
  }
});

|