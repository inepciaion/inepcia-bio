// ---------- Год в подвале ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Аватарка: подстраховка ----------
// 1) пробуем фото из Telegram (cdn)
// 2) если не загрузилось — локальный файл assets/avatar.jpg
// 3) если и его нет — буква на градиенте
const avatar = document.getElementById("avatar");
const fallback = document.getElementById("avatar-fallback");
let avatarTriedLocal = false;

avatar.addEventListener("error", () => {
  if (!avatarTriedLocal) {
    avatarTriedLocal = true;
    avatar.src = "assets/avatar.jpg";
  } else {
    avatar.hidden = true;
    fallback.hidden = false;
  }
});

// ---------- Волна при клике на кнопку ----------
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";
    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
});

// ---------- Лёгкий параллакс фоновых пятен за курсором ----------
const blobs = document.querySelectorAll(".blob");
if (window.matchMedia("(pointer: fine)").matches) {
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    blobs.forEach((b, i) => {
      const depth = (i + 1) * 10;
      b.style.translate = `${x * depth}px ${y * depth}px`;
    });
  });
}
