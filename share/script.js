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