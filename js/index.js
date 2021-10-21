const grid = document.getElementById("grid");
const startBtn = document.getElementById("start-btn");
const score = document.getElementById("score");

const leftBtn = document.getElementById("left-btn");
const upBtn = document.getElementById("up-btn");
const rightBtn = document.getElementById("right-btn");
const downBtn = document.getElementById("down-btn");

let squares = [];
let currentSnake = [2, 1, 0];

let direction = 1;
let width = 10;

let gameScore = 0;

let appleIndex = 0;

let startInterval;
let intervalTime = 1200;
let speed = 0.95;

createGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

function startGame() {
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));

  squares[appleIndex].classList.remove("apple");

  clearInterval(startInterval);

  gameScore = 0;
  score.textContent = gameScore;

  currentSnake = [2, 1, 0];

  direction = 1;

  intervalTime = 1200;

  generateApple();
  currentSnake.forEach((index) => squares[index].classList.add("snake"));

  startInterval = setInterval(moveSnake, intervalTime);
}

function createGrid() {
  for (let i = 0; i < 100; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
    squares.push(square);
  }
}

function moveSnake() {
  if (
    (direction === -10 && currentSnake[0] - 10 <= 0) || //if the snake hits top
    (direction === 10 && currentSnake[0] + 10 >= 100) || //if the snake hits bottom
    (direction === -1 && currentSnake[0] % 10 === 0) || //if the snake hits left
    (direction === 1 && currentSnake[0] % 10 === 9) || //if the snake hits right
    squares[currentSnake[0] + direction].classList.contains("snake")
  )
    return clearInterval(startInterval);

  // reduce snake length
  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");

  // add to snake head in array
  currentSnake.unshift(currentSnake[0] + direction);

  // when snake eats apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    currentSnake.push(tail);
    gameScore += 5;
    score.textContent = gameScore;
    intervalTime = intervalTime * speed;
    startInterval = setInterval(moveSnake, intervalTime);
    generateApple();
  }

  // add to snake head on page
  squares[currentSnake[0]].classList.add("snake");
}

// end of moveSnake function

function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");
}

function controlSnake(e) {
  if (e.keyCode === 37) {
    console.log("left pressed");
    left();
  } else if (e.keyCode === 38) {
    console.log("up pressed");
    up();
  } else if (e.keyCode === 39) {
    console.log("right pressed");
    right();
  } else if (e.keyCode === 40) {
    console.log("down pressed");
    down();
  }
}

function left() {
  direction = -1;
}

function up() {
  direction = -width;
}

function right() {
  direction = 1;
}

function down() {
  direction = width;
}

startBtn.addEventListener("click", startGame);
leftBtn.addEventListener("click", left);
upBtn.addEventListener("click", up);
rightBtn.addEventListener("click", right);
downBtn.addEventListener("click", down);
document.body.addEventListener("keyup", controlSnake);
