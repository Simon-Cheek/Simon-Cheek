import { randomNum } from "./helpers.js";

const userForm = document.querySelector("#color-user");
const nameButton = document.querySelector("#begin");
const resetButton = document.querySelector("#reset");
const turnButton = document.querySelector("#submit");
const arena = document.querySelector("#color-guesser");
const name1 = document.querySelector("#user1");
const name2 = document.querySelector("#user2");
const p1Display = document.querySelectorAll(".p1");
const p2Display = document.querySelectorAll(".p2");
const guessForm = document.querySelector("#guess");
const guess1 = document.querySelector("#guess1");
const guess2 = document.querySelector("#guess2");
const theOrb = document.querySelector(".color-orb");
const notif = document.querySelector("#notif");
const scoreDisplay1 = document.querySelector("#p1score");
const scoreDisplay2 = document.querySelector("#p2score");

let playerName1 = "";
let playerName2 = "";
let score1 = 0;
let score2 = 0;
let finalScore = 3;

arena.style.display = "none";

function validInfo() {
  if (
    name1.value == "" ||
    name2.value == "" ||
    name1.value.length > 20 ||
    name2.value.length > 20
  ) {
    return false;
  }
  return true;
}

function rollbackChanges() {
  theOrb.style.backgroundColor = "rgba(0, 50, 240)";
  notif.innerText = "";
  score1 = 0;
  score2 = 0;
  turnButton.classList.remove("stale-btn");
  resetButton.style.display = "none";
  scoreDisplay1.innerText = score1;
  scoreDisplay2.innerText = score2;
  guess1.value = "#000000";
  guess2.value = "#000000";
}

function newGame() {
  rollbackChanges();
  arena.style.display = "block";
  for (let name of p1Display) {
    name.innerText = name1.value;
  }
  for (let name of p2Display) {
    name.innerText = name2.value;
  }
  playerName1 = name1.value;
  playerName2 = name2.value;
  name1.value = "";
  name2.value = "";
  score1 = 0;
  score2 = 0;
  // theOrb.style.backgroundColor = "rgba(0, 50, 240)";
}

function hexToRgbA(hex) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return [(c >> 16) & 255, (c >> 8) & 255, c & 255];
  }
  throw new Error("Bad Hex");
}

function calculateScore(arr, r, g, b) {
  let score = 0;
  score += Math.abs(arr[0] - r);
  score += Math.abs(arr[1] - g);
  score += Math.abs(arr[2] - b);
  return score;
}

function endGame() {
  turnButton.classList.add("stale-btn");
  resetButton.style.display = "block";
  // console.log('ended');
}

function color_delay(r, g, b) {
  return new Promise((resolve) => {
    deactivateGuess();
    setTimeout(() => {
      console.log("I resolved!");
      theOrb.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 1)`;
      activateGuess();
      resolve("changed!");
    }, 500);
  });
}

const takeTurn = async function () {
  if (score1 == finalScore || score2 == finalScore) {
    alert("Game is finished!");
  } else {
    const arr1 = hexToRgbA(guess1.value);
    const arr2 = hexToRgbA(guess2.value);
    const r = randomNum();
    const g = randomNum();
    const b = randomNum();
    // console.log(`rgba(${r}, ${g}, ${b}, 1)`)
    const delay = await color_delay(r, g, b);
    // theOrb.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 1)`;
    const playerResult1 = calculateScore(arr1, r, g, b);
    const playerResult2 = calculateScore(arr2, r, g, b);
    if (playerResult1 < playerResult2 && playerResult1 < 225) {
      score1++;
      notif.innerText = `${playerName1} was closer!`;
      scoreDisplay1.innerText = score1;
    } else if (playerResult2 < playerResult1 && playerResult2 < 225) {
      score2++;
      notif.innerText = `${playerName2} was closer!`;
      scoreDisplay2.innerText = score2;
    } else {
      notif.innerText = "It's a tie!";
    }

    guess1.value = "#000000";
    guess2.value = "#000000";

    if (score1 == finalScore) {
      notif.innerText = `${playerName1} wins the game!`;
      endGame();
    } else if (score2 == finalScore) {
      notif.innerText = `${playerName2} wins the game!`;
      endGame();
    }
  }
};

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validInfo()) {
    newGame();
  } else {
    alert(
      "Please enter valid Player Names! (Names cannot be over 20 characters long)"
    );
  }
});

function activate(e) {
  e.preventDefault();
  // console.log('HIII')
  takeTurn();
}

const activateGuess = () => guessForm.addEventListener("submit", activate);
const deactivateGuess = () => guessForm.removeEventListener("submit", activate);

guessForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

resetButton.addEventListener("click", () => {
  arena.style.display = "none";
  rollbackChanges();
});

activateGuess();

// deactivateGuess();
