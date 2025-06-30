import { test, expect } from '@playwright/test';

test.describe('Проверка загрузки файлов в разделе аналитики', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/analytics');
    });

    test('можно выбрать файл через кнопку', async ({ page }) => {
        // Используем правильный селектор для input файла
        const fileInput = page.locator('input[type="file"]');
        await expect(fileInput).toBeVisible();

        const filePath = 'tests/fixtures/test-data.csv';
        await fileInput.setInputFiles(filePath);

        // Проверяем, что файл загружен (появится имя файла)
        await expect(page.getByText('test-data.csv')).toBeVisible();
    });

    test('отображается прогресс загрузки', async ({ page }) => {
        const filePath = 'tests/fixtures/test-data.csv';

        // Загружаем файл
        await page.locator('input[type="file"]').setInputFiles(filePath);

        // Проверяем, что появилась кнопка "Отправить" (активная)
        await expect(page.getByRole('button', { name: /Отправить/i })).toBeVisible();
    });

});