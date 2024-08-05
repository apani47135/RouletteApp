export function AddNeighborBet(number, div, type, callback) {
  const neighborDiv = document.createElement("div");

  neighborDiv.classList.add(
    type === "Vertical" ? "vertical-neighbor" : "horizontal-neighbor"
  );

  if (number === 34 || number === 35) {
    neighborDiv.classList.add("vertical-neighbor-special");
  }

  neighborDiv.addEventListener("click", (event) => {
    event.stopPropagation();
    console.log("neighbor bet clicked");
    callback({
      Type: "Neighbor",
      Numbers:
        type === "Vertical" ? [number, number + 1] : [number, number + 3],
    });
    AddPokerChip(event);
  });

  neighborDiv.addEventListener("mouseover", function () {
    if (type === "Vertical") {
      document
        .getElementById(String(number + 1))
        .classList.add("surrounding-div");
    } else {
      document
        .getElementById(String(number + 3))
        .classList.add("surrounding-div");
    }
  });

  neighborDiv.addEventListener("mouseout", function () {
    document.querySelectorAll(".surrounding-div").forEach((div) => {
      div.classList.remove("surrounding-div");
    });
  });

  div.appendChild(neighborDiv);
}

export function AddPokerChip(event) {
  const container = event.currentTarget;
  const div = document.createElement("div");
  div.style.position = "relative";
  const pokerChip = document.createElement("img");
  pokerChip.src = "/pokerchip.png"; // Set the path to your poker chip icon
  pokerChip.classList.add("pokerchip");
  // pokerChip.style.left = `${event.offsetX}px`; // Adjust to center the icon
  // pokerChip.style.top = `${event.offsetY}px`; // Adjust to center the icon
  //pokerChip.style.transform = "translate(-23%, -31%)";
  div.appendChild(pokerChip);
  container.appendChild(div);
}
