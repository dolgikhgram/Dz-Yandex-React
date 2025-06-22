Инструкция по запуску:

1. Клонирование репозитория (git clone https://github.com/dolgikhgram/Dz-Yandex-React>)
2. Установка зависимостей (npm install)
3. Запуск (npm run dev)

Описание архктиктуры:

1. Точка входа (src/main.tsx)
   Инициализация React приложения
   Подключение глобальных стилей с адаптивными настройками
2. Главный компонент (src/main/App.tsx)
   Конфигурация маршрутизации
   Основной layout с Header
   Роуты для модулей: Analytics, Generator, History
3. Модульная архитектура (src/modules/)
   Основные модули:
   Analytics - аналитическая панель с загрузкой и обработкой CSV файлов
   Generator - генератор данных/контента
   History - история операций с возможностью просмотра результатов
   Portal - портальный интерфейс
   Общие компоненты (src/modules/common/):
   ButtonCollection - коллекция переиспользуемых кнопок
   Basket - корзина для удаления элементов
   ButtonUpload - кнопка загрузки с различными состояниями
   Button - базовая кнопка с типами (active, unactive, download, clear)
4. Управление состоянием (src/Store/Store.tsx)