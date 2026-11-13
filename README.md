# inepcia-bio

Сайт-визитка в стиле Biolink: аватарка из Telegram + 6 кнопок на соцсети (2 ряда по 3).

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
| GitHub  | `https://github.com/inepcia` |
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

## Деплой на Netlify

### Вариант A — через CLI (быстрый)

```powershell
npm i -g netlify-cli
netlify login                      # авторизация в браузере
netlify init                       # выбрать/создать сайт в текущей папке
netlify deploy --prod              # прод-деплой
```

### Вариант B — через GitHub

1. Создай репозиторий на GitHub и запуши:
   ```powershell
   git remote add origin https://github.com/<твой-логин>/inepcia-bio.git
   git push -u origin main
   ```
2. В Netlify: **Add new site → Import an existing project → GitHub → выбрать репозиторий**.
3. Build command оставить пустым, Publish directory — `.`

Готово: ссылка вида `https://<имя-сайта>.netlify.app`.
