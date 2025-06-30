import { test, expect } from '@playwright/test';

test.describe('Проверка отправки данных на сервер и получения результатов', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/analytics');
    });

    test('отправка файла на сервер и получение результатов', async ({ page }) => {
        // Мокаем API ответ
        await page.route('**/aggregate**', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    rows_affected: 5,
                    total_spend_galactic: 1000,
                    less_spent_civ: 'Human',
                    big_spent_civ: 'Delta',
                    less_spent_value: 100,
                    average_spend_galactic: 200,
                    less_spent_at: 1,
                    big_spent_at: 4
                })
            });
        });

        // Загружаем файл
        const fileInput = page.locator('input[type="file"]');
        const filePath = 'tests/fixtures/test-data.csv';
        await fileInput.setInputFiles(filePath);

        // Кликаем "Отправить"
        await page.getByRole('button', { name: /Отправить/i }).click();

        // Проверяем, что результаты отобразились
        await expect(page.getByText('1000')).toBeVisible(); // total_spend_galactic
        await expect(page.getByText('Human')).toBeVisible(); // less_spent_civ
        await expect(page.getByText('Delta')).toBeVisible(); // big_spent_civ
        await expect(page.getByText('готово!')).toBeVisible(); //
    });



    test('отображение прогресса обработки', async ({ page }) => {
        // Мокаем медленный API ответ
        await page.route('**/aggregate**', async route => {
            // Имитируем задержку
            await new Promise(resolve => setTimeout(resolve, 1000));

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    rows_affected: 5,
                    total_spend_galactic: 1000,
                    less_spent_civ: 'Alpha',
                    big_spent_civ: 'Delta',
                    less_spent_value: 100,
                    average_spend_galactic: 200,
                    less_spent_at: 1,
                    big_spent_at: 4
                })
            });
        });
        // Загружаем файл
        const fileInput = page.locator('input[type="file"]');
        const filePath = 'tests/fixtures/test-data.csv';
        await fileInput.setInputFiles(filePath);
        await page.getByRole('button', { name: /Отправить/i }).click();
        // Проверяем, что отображается прогресс
        await expect(page.getByText(/идёт парсинг файла/i)).toBeVisible();
        // Ждем завершения и проверяем результат
        await expect(page.getByText('1000')).toBeVisible();
    });
    test('обработка ошибки API', async ({ page }) => {
        // Мокаем ошибку API
        await page.route('**/aggregate**', async route => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({ error: 'Server error' })
            });
        });

        // Загружаем файл
        const fileInput = page.locator('input[type="file"]');
        const filePath = 'tests/fixtures/test-data.csv';
        await fileInput.setInputFiles(filePath);

        // Кликаем "Отправить"
        await page.getByRole('button', { name: /Отправить/i }).click();

        // Проверяем, что ошибка обработана
        await expect(page.getByText(/упс, не то/i)).toBeVisible();
    });
});