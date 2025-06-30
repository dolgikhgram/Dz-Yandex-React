import { test, expect } from '@playwright/test';

test.describe('Analytics Module', () => {
    test.beforeEach(async ({ page }) => {
        // Переходим на страницу Analytics перед каждым тестом
        await page.goto('/analytics');
    });

    test('на странице присутствует поле загрузки файла', async ({ page }) => {
        // Проверяем наличие поля загрузки
        await expect(page.locator('input[type="file"]')).toBeVisible();
    });

});