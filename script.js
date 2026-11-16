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
// 1) сразу показываем локальную копию — круг не пустует, пока грузится Telegram
// 2) если Telegram отдал свежее фото — подменяем
// 3) если локального файла нет — буква на градиенте
const avatar = document.getElementById("avatar");
const fallback = document.getElementById("avatar-fallback");
const remoteAvatar = avatar.getAttribute("src");

avatar.src = "assets/avatar.jpg";

avatar.addEventListener("error", () => {
  avatar.hidden = true;
  fallback.hidden = false;
});

const avatarProbe = new Image();
avatarProbe.onload = () => {
  if (!avatar.hidden) avatar.src = remoteAvatar;
};
avatarProbe.src = remoteAvatar;

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
