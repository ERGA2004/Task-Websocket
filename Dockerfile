# Используем Node.js в качестве базового образа
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем package.json и устанавливаем зависимости
COPY package.json .
RUN npm install

# Копируем все файлы приложения
COPY . .

# Пробрасываем порт для WebSocket сервера
EXPOSE 8000

# Запуск приложения
CMD ["node", "src/app.js"]
