# inepcia-bio

Сайт-визитка в стиле Biolink: аватарка из Telegram + 6 кнопок на соцсети (2 ряда по 3) и 3 пустых кнопки-заглушки под будущие ссылки.

**Живой сайт:** https://inepciaion.github.io/inepcia-bio
**Репозиторий:** https://github.com/inepciaion/inepcia-bio

Деплой автоматический: `git push` в `main` → GitHub Pages публикует обновление (~30 секунд).

## Структура

```
index.html   — разметка (кнопки и ссылки правятся здесь)
style.css    — дизайн (цвета, эффекты, адаптив)
script.js    — аватарка-подстраховка, волна клика, параллакс фона
assets/      — локальная копия аватарки (фолбэк, если Telegram CDN недоступен)
netlify.toml — настройки деплоя на Netlify
```

## Как поменять ссылки

Открой `index.html`, найди блок `<nav class="links">` и замени `href` у нужной кнопки:

| Кнопка  | Где править        |
|---------|--------------------|
| Telegram| `https://t.me/inepcia` |
| GitHub  | `https://github.com/inepciaion` |
| TikTok  | `https://www.tiktok.com/@inepcia` |
| Twitch  | `https://www.twitch.tv/inepcia` |
| Discord | `https://discord.gg/inepcia` |
| Steam   | `https://steamcommunity.com/id/inepcia` |

Аватарка берётся из Telegram (`cdn4.telesco.pe`) — при смене фото в Телеграме обновится сама. Фолбэк: `assets/avatar.jpg` → буква на градиенте.

## Локальный запуск

```powershell
npx serve .
# или
npx http-server -p 8080
```

## Деплой (уже настроен)

**Основной хостинг — GitHub Pages:** https://inepciaion.github.io/inepcia-bio

- Источник: ветка `main`, корень репозитория (включено через API GitHub).
- Обновление:
  ```powershell
  cd C:\Users\user\inepcia-bio
  git add -A
  git commit -m "update: ..."
  git push
  ```
  Через ~30 секунд обновление будет на проде (https://github.com/inepciaion/inepcia-bio/pages).

**Netlify:** сайт `inepcia` там удалён (13.11.2026) — хостинг полностью переехал на GitHub Pages.
Причина переезда: на бесплатном плане Netlify закончились кредиты на сборки (300/мес), их потратили деплойы проекта `inepciaion-bio` и этого сайта. Учётка Netlify живёт, так что при желании можно завести там новый сайт позже (кредиты сбрасываются 11 числа каждого месяца).
