const canvas = document.getElementById("networkCanvas");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let points = [];
let animationFrame;

function resizeCanvas() {
  const rect = canvas.parentElement.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  width = rect.width;
  height = rect.height;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  createPoints();
}

function createPoints() {
  const count = Math.max(42, Math.floor(width / 28));
  points = Array.from({ length: count }, (_, index) => {
    const band = index % 3;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.18,
      r: band === 0 ? 2.6 : 1.8,
      accent: band === 0,
    };
  });
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  for (const point of points) {
    point.x += point.vx;
    point.y += point.vy;

    if (point.x < -20) point.x = width + 20;
    if (point.x > width + 20) point.x = -20;
    if (point.y < -20) point.y = height + 20;
    if (point.y > height + 20) point.y = -20;
  }

  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      const a = points[i];
      const b = points[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 150) {
        const opacity = (1 - distance / 150) * 0.22;
        ctx.strokeStyle = `rgba(103, 232, 249, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  for (const point of points) {
    ctx.fillStyle = point.accent ? "rgba(16, 185, 129, 0.9)" : "rgba(103, 232, 249, 0.72)";
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
    ctx.fill();
  }

  animationFrame = requestAnimationFrame(draw);
}

function init() {
  resizeCanvas();
  cancelAnimationFrame(animationFrame);
  draw();
}

window.addEventListener("resize", resizeCanvas);
init();
