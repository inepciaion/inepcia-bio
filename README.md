# inepcia-bio

Сайт-визитка в стиле Biolink: аватарка из Telegram + 6 кнопок на соцсети (2 ряда по 3).

**Живой сайт:** https://inepcia.netlify.app
**Репозиторий:** https://github.com/inepciaion/inepcia-bio

Деплой автоматический: `git push` в `main` → Netlify публикует обновление.

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

- Сайт на Netlify: **https://inepcia.netlify.app** (проект `inepcia`, панель — https://app.netlify.com/projects/inepcia)
- Репозиторий GitHub связан с Netlify: ветка `main`, publish directory `.`, build command пустая.
- Как обновить сайт:
  ```powershell
  cd C:\Users\user\inepcia-bio
  git add -A
  git commit -m "update: ..."
  git push
  ```
  Через ~30 секунд обновление будет на проде (Deploys в панели Netlify).

Ручной деплой без git тоже работает: `netlify deploy --prod`.
