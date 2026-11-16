# inepcia — bio-сайт

Сайт-визитка в стиле дизайна Apple: аватарка из Telegram, печатающееся имя, белая карточка с мягкой тенью, светлая тема и автоматическая тёмная по системной настройке.

## Адреса

| Что | Ссылка |
|---|---|
| **Основной (GitHub Pages)** | https://inepciaion.github.io/ |
| **Зеркало (Cloudflare Pages)** | https://inepcia-bio.pages.dev/ |
| Репозиторий | https://github.com/inepciaion/inepciaion.github.io |

> Старый адрес `https://inepciaion.github.io/inepcia-bio/` больше не работает — репозиторий переименован в `inepciaion.github.io`, чтобы получить короткий адрес.

## Структура

```
index.html   — разметка (кнопки и ссылки правятся здесь)
style.css    — дизайн (цвета, эффекты, адаптив)
script.js    — печатающееся имя, фолбэк аватарки, волна клика
assets/      — локальная копия аватарки (фолбэк, если Telegram CDN недоступен)
```

## Порядок кнопок

1. Telegram — `https://t.me/inepcia`
2. Discord — `https://discord.com/users/861511079343816714`
3. Steam — `https://steamcommunity.com/profiles/76561199397823842/`
4. Twitch — `https://twitch.tv/inepcia`
5. TikTok — `https://www.tiktok.com/@bezdarnosty_o`
6. GitHub — `https://github.com/inepciaion`
7. Сайт — `https://inepciaion-bio.netlify.app/#contact`

Плюс две пустые кнопки-заглушки (`btn-empty`) под будущие ссылки. Чтобы добавить ссылку — заменить одну заглушку на `<a class="btn" ...>`.

Аватарка берётся из Telegram (`cdn4.telesco.pe`), при смене фото в Telegram обновится сама. Фолбэк: `assets/avatar.jpg` → буква на градиенте.

## Оформление

- Светлая тема (`#f5f5f7` + белая карточка) и тёмная (`#000` + `#1c1c1e`).
- Переключатель темы — круглая кнопка: на компьютере в правом верхнем углу окна, на телефоне — в карточке рядом с аватаркой. Выбор запоминается в `localStorage`, пока выбора нет — сайт следует системной настройке (`prefers-color-scheme`). Тему применяет маленький скрипт в `<head>` до первой отрисовки, чтобы не мигало белым.
- Цвета и тени собраны в CSS-переменных в начале `style.css` (`--bg`, `--card`, `--text`, `--tile`, `--blue` и т.д.) — менять оформление удобно там.
- Иконки брендов окрашены через `--brand` у `.btn:nth-child(N)` в `style.css`, а не в разметке.

## Локальный запуск

```powershell
npx serve .
```

## Деплой

### GitHub Pages (основной, авто)

`git push` в `main` → Pages публикует обновление (~30–60 секунд).

```powershell
cd C:\Users\user\inepcia-bio
git add -A
git commit -m "update: ..."
git push
```

Источник: ветка `main`, корень репозитория (user site, поэтому сайт открывается с корня домена).

### Cloudflare Pages (зеркало, вручную)

Проект `inepcia-bio` создан через Wrangler (direct upload, без Git-интеграции), поэтому обновлять нужно командой:

```powershell
# 1. собрать чистую копию файлов (без .git)
$dst = "$env:TEMP\inepcia-dist"
Remove-Item $dst -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory $dst | Out-Null
Copy-Item C:\Users\user\inepcia-bio\index.html, C:\Users\user\inepcia-bio\style.css, C:\Users\user\inepcia-bio\script.js $dst
Copy-Item C:\Users\user\inepcia-bio\assets $dst -Recurse

# 2. залить
npx wrangler@latest pages deploy $dst --project-name=inepcia-bio --branch=main
```

Логин в Cloudflare (если истёк токен): `npx wrangler@latest login`.

## Важно про доступность в РФ

- **GitHub Pages** — из России открывается (проверено 14.11.2026, Ростелеком).
- **`*.pages.dev`** — с российских провайдеров фильтруется по имени домена: TCP-соединение с Cloudflare проходит, а запрос с `Host: inepcia-bio.pages.dev` сбрасывается (`ECONNRESET`). То есть зеркало работает, но без своего домена из РФ недоступно.
- Решение для зеркала в РФ — подключить **свой домен** к проекту Cloudflare Pages (Custom domains в панели). Тогда адрес будет вида `https://inepcia.ru/`, и блокировка по `pages.dev` перестанет мешать.

## История хостинга

- **Netlify** — сайт удалён 13.11.2026: на бесплатном плане закончились кредиты (300/мес). Учётка жива, кредиты сбрасываются 11 числа каждого месяца.
- **GitHub Pages** — основной хостинг с 13.11.2026.
- **Cloudflare Pages** — зеркало с 14.11.2026.
