export function AddCornerBet(number, div, callback) {
  const cornerDiv = document.createElement("div");
  cornerDiv.classList.add("corner-bet");

  cornerDiv.addEventListener("click", (event) => {
    event.stopPropagation();
    console.log("corner bet clicked");
    callback({
      Type: "Corner",
      Numbers: [number, number + 1, number + 3, number + 4],
    });
    AddPokerChip(event);
  });

  cornerDiv.addEventListener("mouseover", function () {
    document
      .getElementById(String(number + 1))
      .classList.add("surrounding-div");
    document
      .getElementById(String(number + 3))
      .classList.add("surrounding-div");
    document
      .getElementById(String(number + 4))
      .classList.add("surrounding-div");
  });

  cornerDiv.addEventListener("mouseout", function () {
    document.querySelectorAll(".surrounding-div").forEach((div) => {
      div.classList.remove("surrounding-div");
    });
  });

  div.appendChild(cornerDiv);
}

export function AddPokerChip(event) {
  const container = event.currentTarget;
  const div = document.createElement("div");
  div.style.position = "relative";
  const pokerChip = document.createElement("img");
  pokerChip.src = "assets/images/pokerchip.png"; // Set the path to your poker chip icon
  pokerChip.classList.add("pokerchip");
  // pokerChip.style.left = `${event.offsetX}px`; // Adjust to center the icon
  // pokerChip.style.top = `${event.offsetY}px`; // Adjust to center the icon
  //pokerChip.style.transform = "translate(-23%, -31%)";
  div.appendChild(pokerChip);
  container.appendChild(div);
}
