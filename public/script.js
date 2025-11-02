const heart = document.querySelector(".heart");
const message = document.querySelector(".message");
const birthday = document.querySelector(".birthday");
let showMessage = false;

function createBubble() {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  const size = Math.random() * 30 + 10;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * window.innerWidth}px`;
  bubble.style.animationDuration = `${Math.random() * 3 + 3}s`;
  document.body.appendChild(bubble);

  setTimeout(() => bubble.remove(), 5000);
}

heart.addEventListener("click", () => {
  heart.classList.add("sparkle");
  setTimeout(() => heart.classList.remove("sparkle"), 800);

  for (let i = 0; i < 20; i++) createBubble();

  if (!showMessage) {
    document.querySelector(".heart-container").style.display = "none";
    message.classList.remove("hidden");
    showMessage = true;
  } else {
    message.classList.add("hidden");
    birthday.classList.remove("hidden");
    showMessage = false;
  }
});
 
