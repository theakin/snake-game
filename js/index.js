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
let intervalTime = 1000;
let speed = 0.9;

createGrid();

currentSnake.forEach((index) => squares[index].classList.add("snake"));

function startGame() {
  // stop game
  clearInterval(startInterval);

  // clear grid
  currentSnake.forEach((index) => squares[index].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");

  // reset variables
  currentSnake = [2, 1, 0];
  gameScore = 0;
  score.textContent = gameScore;
  direction = 1;
  intervalTime = 1000;

  // start game
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

  // remove snake tail
  const tail = currentSnake.pop();
  squares[tail].classList.remove("snake");

  // add to snake head in array
  currentSnake.unshift(currentSnake[0] + direction);

  // when snake eats apple
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    // add to snake
    currentSnake.push(tail);
    gameScore += 5;
    generateApple();
    score.textContent = gameScore;

    // change snake speed
    clearInterval(startInterval);
    intervalTime = intervalTime * speed;
    // to keep the minimum speed at 100ms
    if (intervalTime <= 100) {
      intervalTime = 100;
    }
    startInterval = setInterval(moveSnake, intervalTime);
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
    left();
  } else if (e.keyCode === 38) {
    up();
  } else if (e.keyCode === 39) {
    right();
  } else if (e.keyCode === 40) {
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
