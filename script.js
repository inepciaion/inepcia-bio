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

// ---------- Физика воска: падение, инерция, покачивание и обтекание курсора ----------
const lavaBox = document.querySelector(".lava");
const lavaBlobs = [...document.querySelectorAll(".lava-blob")];

if (lavaBox && lavaBlobs.length) {
  const GRAVITY = 26; // ускорение свободного падения капли
  const MAX_SPEED = 46; // воск вязкий — выше не разгоняется
  const VISCOSITY = 0.994; // сопротивление среды
  const CURSOR_RADIUS = 230; // зона, где поток начинает огибать курсор
  const SWIRL = 2400; // касательная сила: воск уходит вбок, а не назад
  const OUTWARD = 820; // лёгкая составляющая от курсора — «толщина» обода
  const BARRIER = 5200; // мягкий барьер: в сам курсор воск не заходит
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  let width = lavaBox.clientWidth;
  let height = lavaBox.clientHeight;

  const pointer = { x: 0, y: 0, active: false };

  const blobs = lavaBlobs.map((el) => ({
    el,
    w: el.offsetWidth,
    h: el.offsetHeight,
    x: 0,
    y: 0,
    vx: 0,
    vy: 10,
    phase: Math.random() * Math.PI * 2,
    sway: 6 + Math.random() * 8, // амплитуда покачивания
    freq: 0.35 + Math.random() * 0.5, // скорость покачивания
  }));

  const place = (b, initial) => {
    b.x = -b.w * 0.25 + Math.random() * (width - b.w * 0.5);
    b.y = initial ? Math.random() * height - b.h : -b.h - Math.random() * height * 0.5;
    b.vx = (Math.random() - 0.5) * 8;
    b.vy = 8 + Math.random() * 14;
  };

  // стартовое заполнение кадра: капли не появляются все разом сверху
  blobs.forEach((b, i) => {
    b.x = (i + 0.2) * (width / blobs.length) - b.w * 0.15;
    b.y = Math.random() * height - b.h;
  });

  const render = (b) => {
    const speed = Math.hypot(b.vx, b.vy);
    const stretch = Math.min(speed / 620, 0.08); // шар почти не деформируется
    const sx = 1 / (1 + stretch * 0.85);
    const sy = 1 + stretch;
    const tilt = Math.max(-4, Math.min(4, b.vx * 0.16)); // едва заметный крен
    const fadeIn = Math.min(1, (b.y + b.h) / (b.h * 0.6));
    const fadeOut = Math.min(1, (height - b.y) / (b.h * 0.5));
    const alpha = Math.max(0, Math.min(fadeIn, fadeOut));

    b.el.style.opacity = alpha.toFixed(3);
    b.el.style.transform =
      `translate3d(${b.x.toFixed(2)}px, ${b.y.toFixed(2)}px, 0) ` +
      `rotate(${tilt.toFixed(2)}deg) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
  };

  if (reduceMotion) {
    // без анимации: просто расставляем капли по кадру
    blobs.forEach((b, i) => {
      b.y = (i / blobs.length) * height + height * 0.05;
      render(b);
      b.el.style.opacity = 1;
    });
  } else {
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 0.04);
      last = now;
      const time = now / 1000;

      blobs.forEach((b) => {
        // 1. падение с ускорением
        b.vy += GRAVITY * dt;

        // 2. покачивание течения
        b.vx += Math.sin(time * b.freq + b.phase) * b.sway * dt;

        // 3. курсор — препятствие в потоке: воск плавно обтекает его
        if (finePointer && pointer.active) {
          const cx = b.x + b.w / 2;
          const cy = b.y + b.h / 2;
          const dx = cx - pointer.x;
          const dy = cy - pointer.y;
          const dist = Math.hypot(dx, dy) || 1;
          const nx = dx / dist;
          const ny = dy / dist;

          const reach = CURSOR_RADIUS + Math.max(b.w, b.h) * 0.35;
          const keepOut = Math.max(b.w, b.h) * 0.52 + 34; // «толщина» курсора

          if (dist < reach) {
            // 0 у барьера → 1 на границе зоны влияния
            const t = Math.min(1, Math.max(0, (dist - keepOut) / Math.max(1, reach - keepOut)));
            const falloff = (1 - t) * (1 - t);

            // касательная вдоль потока: над курсором расходимся, под ним сходимся
            let tx = ny;
            let ty = -nx;
            if (ty < 0) {
              tx = -tx;
              ty = -ty;
            }

            const swirl = SWIRL * falloff * dt;
            b.vx += tx * swirl + nx * OUTWARD * falloff * dt;
            b.vy += ty * swirl + ny * OUTWARD * falloff * dt;
          }

          // мягкий барьер: в сам курсор капля не заезжает (но и не отскакивает)
          if (dist < keepOut) {
            const over = (keepOut - dist) / keepOut;
            const push = BARRIER * over * dt;
            b.vx += nx * push;
            b.vy += ny * push;
          }
        }

        // 4. вязкость
        b.vx *= VISCOSITY;
        b.vy *= VISCOSITY;

        // 5. предел скорости
        const speed = Math.hypot(b.vx, b.vy);
        if (speed > MAX_SPEED) {
          b.vx = (b.vx / speed) * MAX_SPEED;
          b.vy = (b.vy / speed) * MAX_SPEED;
        }

        b.x += b.vx * dt;
        b.y += b.vy * dt;

        // 5. жёсткая граница курсора: капля не может его накрыть
        if (finePointer && pointer.active) {
          const pdx = b.x + b.w / 2 - pointer.x;
          const pdy = b.y + b.h / 2 - pointer.y;
          const pdist = Math.hypot(pdx, pdy) || 1;
          const keep = Math.max(b.w, b.h) * 0.52 + 34;
          if (pdist < keep) {
            b.x += (pdx / pdist) * (keep - pdist);
            b.y += (pdy / pdist) * (keep - pdist);
          }
        }

        // 6. стенки: капля мягко отталкивается
        const leftEdge = -b.w * 0.45;
        const rightEdge = width - b.w * 0.55;
        if (b.x < leftEdge) {
          b.x = leftEdge;
          b.vx = Math.abs(b.vx) * 0.35;
        } else if (b.x > rightEdge) {
          b.x = rightEdge;
          b.vx = -Math.abs(b.vx) * 0.35;
        }

        // 7. ушла за нижний край — рождается заново сверху
        if (b.y > height + b.h * 0.1) place(b, false);

        render(b);
      });

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  window.addEventListener("resize", () => {
    width = lavaBox.clientWidth;
    height = lavaBox.clientHeight;
    blobs.forEach((b) => {
      b.w = b.el.offsetWidth;
      b.h = b.el.offsetHeight;
    });
  });

  window.addEventListener("mousemove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
  });

  window.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget) pointer.active = false;
  });

  window.addEventListener("blur", () => {
    pointer.active = false;
  });
}
