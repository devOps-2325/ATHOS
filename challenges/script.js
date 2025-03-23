function smash(button) {
  button.innerText = "Smashed!";
  button.classList.add("smashed");
  button.disabled = true; // Disable the button after clicking

  // Create the XP message
  const xpMessage = document.createElement("span");
  xpMessage.innerText = "You earned +10xp";
  xpMessage.className = "xp-message";

  // Insert the message after the button
  button.parentNode.appendChild(xpMessage);

  // Automatically hide the message after 3 seconds
  setTimeout(() => {
      xpMessage.remove();
  }, 3000);
}