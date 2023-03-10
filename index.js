const factor = 100 / 5;
let currentIndex = 0;
let currentLeft = 0;
let interval = null;
let types = ["color", "size", "shape"];
let position = [];
let result = [];

function move() {
  const arrowElem = document.getElementById(types[currentIndex]);
  let reverse = false;

  currentLeft = 0;
  interval = setInterval(frame, 1);

  function frame() {
    if (currentLeft === 99) reverse = true;
    if (currentLeft === 0) reverse = false;

    if (reverse) {
      currentLeft--;
    } else {
      currentLeft++;
    }

    arrowElem.style.left = `${currentLeft}%`;
  }
}

function select(e) {
  if (e.keyCode !== 32 && e.type !== "click") return;

  poop();
  clearInterval(interval);
  currentIndex++;

  if (currentIndex >= types.length) {
    window.onkeydown = null;
    window.onclick = null;
    window.ontouchend = null;
    render();
    return;
  }

  move();
}

function poop() {
  const elements = document
    .getElementById(types[currentIndex])
    .parentNode.querySelectorAll(".element");

  position.push(Math.floor(currentLeft / factor));

  elements.forEach((elem) => {
    if (Number(elem.dataset.index) === position[currentIndex]) {
      result.push(elem.dataset.name);
    }
  });
}

function render() {
  const textElem = document.querySelector(".dynamic");
  const resultElem = document.querySelector(".result");

  resultElem.style.display = "block";
  textElem.innerHTML = `<h3>${result[0]} ${result[1]} ${result[2]}</h3>`;
}

window.onkeydown = select;
window.onclick = select;
window.ontouchend = select;
window.onload = move;
