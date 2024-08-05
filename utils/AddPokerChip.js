export function AddPokerChip(event) {
  const container = event.currentTarget;
  const div = document.createElement("div");
  div.style.position = "relative";
  const pokerChip = document.createElement("img");
  pokerChip.src = "../pokerchip.png"; // Set the path to your poker chip icon
  pokerChip.classList.add("pokerchip");
  // pokerChip.style.left = `${event.offsetX}px`; // Adjust to center the icon
  // pokerChip.style.top = `${event.offsetY}px`; // Adjust to center the icon
  div.appendChild(pokerChip);
  container.appendChild(div);
}
