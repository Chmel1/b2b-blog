# Тестовое задание для b2b.polis.online: Simple Blog

Простое SPA-приложение блога с возможностью создания статей и добавления комментариев. Реализовано с использованием Laravel (API), React (Frontend) и Docker (Laravel Sail).

## Стек технологий

- **Backend:** Laravel, MySQL
- **Frontend:** React, React Router, Tailwind CSS, Axios
- **Инфраструктура:** Docker, Laravel Sail

## Требования к окружению

Для запуска проекта необходимы:
- Docker Desktop
- Git
- Терминал (WSL2 для Windows / Linux / macOS)

## Инструкция по установке и запуску

Следуйте этим шагам, чтобы развернуть проект с нуля:

### 1. Клонирование репозитория
```bash
git clone https://github.com/Chmel1/b2b-blog.git
cd [НАЗВАНИЕ_ПАПКИ_ПРОЕКТА]
```
### 2. Настройка окружения
Создайте файл .env из примера:
```bash
cp .env.example .env
```
Важно: Откройте созданный файл .env и замените блок настроек базы данных (строки с DB_...) на следующую конфигурацию для работы с Docker:

```ini

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=b2b_blog
DB_USERNAME=sail
DB_PASSWORD=password
```
### 3. Установка зависимостей Backend
Так как мы используем Docker, устанавливаем зависимости через временный контейнер (выполните эту команду в корне проекта):

```Bash

docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/var/www/html" \
    -w /var/www/html \
    laravelsail/php82-composer:latest \
    composer install --ignore-platform-reqs
```
### 4. Запуск контейнеров
Запускаем приложжение в фоновом режиме:
```bash
./vendor/bin/sail up -d
```

### 5. Генерация ключа приложения:
```bash
./vendor/bin/sail artisan key:generate
```

### 6. Миграции и тестовые данные (Seeders)
Создаем таблицы в БД и заполняем их тестовыми статьями:
```Bash
./vendor/bin/sail artisan migrate --seed
```
###7. Сборка Frontend
Устанавливаем JS-зависимости и собираем ассеты:
```Bash
./vendor/bin/sail npm install
./vendor/bin/sail npm run build
```

###8. Готово!
Проект доступен в браузере по адресу:
http://localhost

API Endpoints
GET /api/articles — Список статей
GET /api/articles/{id} — Просмотр статьи
POST /api/articles — Создание статьи
POST /api/articles/{id}/comments — Добавление комментария
