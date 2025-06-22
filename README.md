Инструкция по запуску:

1. Клонирование репозитория (git clone https://github.com/dolgikhgram/Dz-Yandex-React>)
2. Установка зависимостей (npm install)
3. Запуск (npm run dev)

Описание архктиктуры:

1. Точка входа (main.tsx)
2. Главный компонент (App.tsx)
3. Модульная архитектура (modules)
   Модули:
   Analytics - аналитическое поле
   Generator - генератор данных
   History - история операций
   Общие компоненты (common):
   Portal - портальный интерфейс
   ButtonCollection - коллекция кнопок
   Basket - корзина
   ButtonUpload - кнопка загрузки
   Button - базовая кнопка
4. Управление состоянием (Store.tsx)
5. Компонентная структура  
   Header (Header)
