// ---------- Год в подвале ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Имя «печатается» при заходе на сайт ----------
const nameEl = document.querySelector(".name");
const fullName = (nameEl.textContent || "").trim();
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (nameEl && fullName && !reduceMotion) {
  nameEl.textContent = "";
  nameEl.classList.add("typing");

  let i = 0;
  const type = () => {
    i += 1;
    nameEl.textContent = fullName.slice(0, i);
    if (i < fullName.length) {
      // лёгкая «нервная» пауза между буквами
      const pause = 90 + Math.random() * 90;
      setTimeout(type, pause);
    } else {
      // оставляем мигающий курсор на секунду, потом убираем
      setTimeout(() => nameEl.classList.remove("typing"), 1200);
    }
  };
  setTimeout(type, 500);
}

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

// ---------- Капли воска расступаются перед курсором ----------
const lavaBlobs = document.querySelectorAll(".lava-blob");
if (lavaBlobs.length && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
  const RADIUS = 260; // на сколько далеко капля «чувствует» курсор
  const PUSH = 95; // максимальный сдвиг в сторону
  let pointer = null;
  let frame = null;

  const update = () => {
    frame = null;
    if (!pointer) return;

    lavaBlobs.forEach((blob) => {
      const rect = blob.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // ближайшая к курсору точка капли — так крупные капли реагируют у края
      const nx = Math.max(rect.left, Math.min(pointer.x, rect.right));
      const ny = Math.max(rect.top, Math.min(pointer.y, rect.bottom));
      const edge = Math.hypot(pointer.x - nx, pointer.y - ny);

      if (edge > RADIUS) {
        if (blob.style.translate) blob.style.translate = "0px 0px";
        return;
      }

      const dx = cx - pointer.x;
      const dy = cy - pointer.y;
      const dist = Math.hypot(dx, dy) || 1;

      // чем ближе курсор — тем сильнее капля обтекает его
      const force = (1 - edge / RADIUS) ** 2 * PUSH;
      blob.style.translate = `${(dx / dist) * force}px ${(dy / dist) * force}px`;
    });
  };

  window.addEventListener("mousemove", (e) => {
    pointer = { x: e.clientX, y: e.clientY };
    if (!frame) frame = requestAnimationFrame(update);
  });

  window.addEventListener("blur", () => {
    pointer = null;
    lavaBlobs.forEach((blob) => (blob.style.translate = "0px 0px"));
  });
}
