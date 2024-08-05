import { AddCornerBet } from "./utils/addCornerBet.js";
import { AddNeighborBet } from "./utils/addNeighborBet.js";
import { AddPokerChip } from "./utils/AddPokerChip.js";
import {
  columnBets,
  evenBets,
  thirdsBets,
  zeros,
  numbers,
  redNumbers,
  corners,
  firstThird,
  secondThird,
  lastThird,
  firstColumn,
  secondColumn,
  thirdColumn,
  allNums,
  evens,
  odds,
  blackNumbers,
  firstHalf,
  secondHalf,
} from "./utils/constants.js";

const board = document.getElementById("insideBets");
const evenBetsdiv = document.getElementById("evenBets");
const thirdsDiv = document.getElementById("thirds");
const columnBetsDiv = document.getElementById("columnBets");
const zerosDiv = document.getElementById("zeros");

document.getElementById("calc-btn").addEventListener("click", () => {
  calculateWinnings();
});

document.getElementById("reset").addEventListener("click", () => {
  location.reload();
});

const currentBets = [];

numbers.forEach((number) => {
  const div = document.createElement("div");
  div.id = number;
  div.classList.add("bet");

  if (redNumbers.includes(number)) {
    div.classList.add("red");
  }
  div.textContent = number;
  div.addEventListener("click", (event) => handleClick(event, number, div));

  //Adding corner bet div if necessary, not for numbers 34, 35, 36
  if (corners.includes(number)) {
    AddCornerBet(number, div, handleCornerClick);
  }

  //Adding horizontal neighbors bet if necessary
  if (![34, 35, 36].includes(number)) {
    AddNeighborBet(number, div, "Horizontal", handleNeighborClick);
  }

  //Adding vertical neighbor bets if necessary
  if (number % 3 != 0) {
    AddNeighborBet(number, div, "Vertical", handleNeighborClick);
  }

  board.appendChild(div);
});

evenBets.forEach((bet) => {
  const div = document.createElement("div");
  div.classList.add("outside-bet");
  div.textContent = bet;
  div.addEventListener("click", (event) => handleEvenClick(event, bet, div));
  evenBetsdiv.appendChild(div);
});

// Add thirds bets
thirdsBets.forEach((bet) => {
  const div = document.createElement("div");
  div.classList.add("outside-bet");
  div.textContent = bet;
  div.addEventListener("click", (event) => handleThirdsClick(event, bet, div));
  thirdsDiv.appendChild(div);
});

// Add column bets
columnBets.forEach((bet, index) => {
  const div = document.createElement("div");
  div.classList.add("column-bets");
  div.textContent = bet;
  div.addEventListener("click", (event) =>
    handleColumnClick(event, bet, index + 1, div)
  );
  columnBetsDiv.appendChild(div);
});

// Add zeros bets
zeros.forEach((bet) => {
  const div = document.createElement("div");
  div.classList.add("zeros-bet");
  div.textContent = bet;
  div.id = bet;
  div.addEventListener("click", (event) => handleClick(event, bet, div));
  zerosDiv.appendChild(div);
});

// Click handlers

function handleClick(event, bet, div) {
  console.log(`${bet} clicked.`);
  // Handle number click logic here
  AddPokerChip(event);
  currentBets.push({ Type: "Single", Numbers: bet });
}

function handleEvenClick(event, bet, div) {
  console.log(`${bet} clicked.`);
  // Handle number click logic here
  AddPokerChip(event);
  if (bet === "EVEN") {
    currentBets.push({ Type: "Even", Numbers: evens });
  } else if (bet === "ODD") {
    currentBets.push({ Type: "Even", Numbers: odds });
  } else if (bet === "RED") {
    currentBets.push({ Type: "Even", Numbers: redNumbers });
  } else if (bet === "BLACK") {
    currentBets.push({ Type: "Even", Numbers: blackNumbers });
  } else if (bet === "1 TO 18") {
    currentBets.push({ Type: "Even", Numbers: firstHalf });
  } else if (bet === "19 TO 36") {
    currentBets.push({ Type: "Even", Numbers: secondHalf });
  }
}

function handleColumnClick(event, bet, column, div) {
  console.log(`${bet} clicked on column ${column}.`);
  AddPokerChip(event);
  if (column === 1) {
    currentBets.push({ Type: "Column", Numbers: firstColumn });
  } else if (column === 2) {
    currentBets.push({ Type: "Column", Numbers: secondColumn });
  } else if (column === 3) {
    currentBets.push({ Type: "Column", Numbers: thirdColumn });
  }
  // Handle number click logic here
}

function handleThirdsClick(event, bet) {
  AddPokerChip(event);
  if (bet.startsWith("1ST")) {
    currentBets.push({ Type: "Thirds", Numbers: firstThird });
  } else if (bet.startsWith("2ND")) {
    currentBets.push({ Type: "Thirds", Numbers: secondThird });
  } else if (bet.startsWith("3RD")) {
    currentBets.push({ Type: "Thirds", Numbers: lastThird });
  }
}

function handleCornerClick(data) {
  currentBets.push(data);
  console.log(currentBets);
  // Handle number click logic here
}

function handleNeighborClick(data) {
  currentBets.push(data);
  console.log(currentBets);
}

function calculateWinnings() {
  let winnings = [];

  currentBets.map((bet) => {
    console.log(bet);
    if (bet.Type === "Single") {
      const betExist = winnings.find((obj) => obj.Number === bet.Numbers);
      if (betExist) {
        betExist.Winnings = betExist.Winnings + 35;
      } else {
        winnings.push({ Number: bet.Numbers, Winnings: 35 });
      }
    } else if (bet.Type === "Corner") {
      //Iterate through the 4 corners
      bet.Numbers.map((num) => {
        const betExist = winnings.find((obj) => obj.Number === num);
        if (betExist) {
          betExist.Winnings = betExist.Winnings + 8;
        } else {
          winnings.push({ Number: num, Winnings: 8 });
        }
      });
    } else if (bet.Type === "Neighbor") {
      //Iterate through the neighbors
      bet.Numbers.map((num) => {
        const betExist = winnings.find((obj) => obj.Number === num);
        if (betExist) {
          betExist.Winnings = betExist.Winnings + 17;
        } else {
          winnings.push({ Number: num, Winnings: 17 });
        }
      });
    } else if (bet.Type === "Thirds" || bet.Type === "Column") {
      //Iterate through the neighbors
      bet.Numbers.map((num) => {
        const betExist = winnings.find((obj) => obj.Number === num);
        if (betExist) {
          betExist.Winnings = betExist.Winnings + 2;
        } else {
          winnings.push({ Number: num, Winnings: 2 });
        }
      });
    } else if (bet.Type === "Even") {
      //Iterate through the neighbors
      bet.Numbers.map((num) => {
        const betExist = winnings.find((obj) => obj.Number === num);
        if (betExist) {
          betExist.Winnings = betExist.Winnings + 1;
        } else {
          winnings.push({ Number: num, Winnings: 1 });
        }
      });
    }
  });

  console.log(winnings);

  allNums.map((num) => {
    console.log(num);
    const betWon = winnings.find((obj) => obj.Number === num);
    if (betWon) {
      const winningDiv = document.getElementById(num);
      winningDiv.innerHTML = `x${betWon.Winnings}`;
      winningDiv.classList.add("winning-bet");
    } else {
      const losingDiv = document.getElementById(num);
      losingDiv.innerHTML = `x0`;
      losingDiv.classList.add("losing-bet");
    }
  });

  winnings.map((win) => {
    const winningDiv = document.getElementById(win.Number);
    winningDiv.innerHTML = `x${win.Winnings}`;
    winningDiv.classList.add("winning-bet");
  });
  return winnings;
}
