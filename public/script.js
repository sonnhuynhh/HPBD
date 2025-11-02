const heart = document.querySelector(".heart");
const message = document.querySelector(".message");
const birthday = document.querySelector(".birthday");
const body = document.body;
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let showMessage = false;
let showFireworks = false;

// Điều chỉnh kích thước canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Bóng bay
function createBalloon() {
  const balloon = document.createElement("div");
  balloon.classList.add("balloon");
  balloon.style.left = `${Math.random() * window.innerWidth}px`;
  balloon.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
  document.body.appendChild(balloon);
  setTimeout(() => balloon.remove(), 6000);
}

// Pháo hoa
let particles = [];
function createFirework(x, y, color) {
  for (let i = 0; i < 50; i++) {
    particles.push({
      x, y,
      color,
      radius: Math.random() * 3,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 5 + 2,
      alpha: 1
    });
  }
}

function drawFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.alpha -= 0.02;
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    if (p.alpha <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(drawFireworks);
}
drawFireworks();

// Sự kiện click
heart.addEventListener("click", () => {
  if (!showMessage) {
    document.querySelector(".heart-container").style.display = "none";
    body.style.background = `url('background.png') center/cover no-repeat`;
    message.classList.remove("hidden");
    showMessage = true;

    // tạo bóng bay
    for (let i = 0; i < 20; i++) setTimeout(createBalloon, i * 200);
  }
});

// Nhấn vào lời chúc lần 2 → hiện pháo hoa + Happy Birthday
message.addEventListener("click", () => {
  if (showMessage) {
    message.classList.add("hidden");
    birthday.classList.remove("hidden");
    showMessage = false;
    showFireworks = true;

    // tạo pháo hoa ngẫu nhiên
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createFirework(
          Math.random() * canvas.width,
          Math.random() * canvas.height / 2,
          `hsl(${Math.random() * 360}, 100%, 60%)`
        );
      }, i * 600);
    }
  }
});
