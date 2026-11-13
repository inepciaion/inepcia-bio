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

// ---------- Лёгкий параллакс фона за курсором ----------
const bg = document.querySelector(".bg");
if (bg && window.matchMedia("(pointer: fine)").matches) {
  let raf = null;
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      bg.style.transform = `translate3d(${x * 12}px, ${y * 12}px, 0)`;
      raf = null;
    });
  });
}
