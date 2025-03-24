// Function to add a new goal
function addGoal() {
  const goalInput = document.getElementById("goalInput");
  const goalList = document.getElementById("goalList");
  const goalText = goalInput.value.trim();

  if (goalText === "") {
      alert("Please enter a goal!");
      return;
  }

  // Create goal item
  const goalItem = document.createElement("li");
  goalItem.className = "goal-item";

  // Add checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // Add goal text
  const goalLabel = document.createElement("span");
  goalLabel.textContent = goalText;

  // Add Smash button
  const smashBtn = document.createElement("button");
  smashBtn.className = "smash-btn";
  smashBtn.textContent = "Smash!";
  smashBtn.onclick = () => smashGoal(smashBtn);

  // Append elements to goal item
  goalItem.appendChild(checkbox);
  goalItem.appendChild(goalLabel);
  goalItem.appendChild(smashBtn);

  // Add goal to the list
  goalList.appendChild(goalItem);

  // Clear input
  goalInput.value = "";
}

// Function to handle "Smash" action
function smashGoal(button) {
  button.textContent = "Smashed!";
  button.disabled = true;
  button.style.background = "#555";

  // Create XP message
  const xpMessage = document.createElement("span");
  xpMessage.className = "xp-message";
  xpMessage.textContent = "You earned +2xp";

  button.parentNode.appendChild(xpMessage);

  // Hide XP message after 3 seconds
  setTimeout(() => xpMessage.remove(), 3000);
}
// Share Challenge - Generates a shareable link
function shareChallenge() {
  const challengeText = document.getElementById('challenge').textContent;
  const shareLink = `${window.location.origin}?challenge=${encodeURIComponent(challengeText)}`;
  
  navigator.clipboard.writeText(shareLink).then(() => {
      showLinkMessage();
  }).catch(err => {
      alert("Error copying link: " + err);
  });
}

// Show "Link Copied" Message
function showLinkMessage() {
  const message = document.getElementById('linkMessage');
  message.style.display = 'block';
  setTimeout(() => {
      message.style.display = 'none';
  }, 3000);
}

// Cheer Button Functionality (with thumbs-up emoji)
function cheer(button) {
  button.innerHTML = 'CHEERED';
  button.disabled = true;
}