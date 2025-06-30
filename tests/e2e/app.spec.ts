import { test, expect } from '@playwright/test';


test.describe('тесты app компоненты', async () => {
    test('приложение загружается и показывает заголовок', async ({ page }) => {
        // Переходим на главную страницу приложения
        // .goto переходит по урлу в скобках
        await page.goto('/');

        // Проверяем, что страница загрузилась
        await expect(page).toHaveTitle(/School/);
    });

    test('навигация работает', async ({ page }) => {
        // Переходим на главную страницу

        await page.goto('/');

        // Проверяем, что кнопки навигации видны
        //getByRole() - ищет элемент по его роли (ARIA)
        // 'link' - роль элемента (ссылка)
        // { name: /Analytics/i } - ищет ссылку с текстом, содержащим "Analytics"
        // /Analytics/i - регулярное выражение, i означает "без учета регистра"

        await expect(page.getByRole('link', { name: /Analytics/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /Generator/i })).toBeVisible();
        await expect(page.getByRole('link', { name: /History/i })).toBeVisible();
    });

    test('можно перейти на страницу Analytics', async ({ page }) => {
        await page.goto('/');

        // Кликаем на кнопку Analytics
        await page.getByRole('link', { name: /Analytics/i }).click();

        // Проверяем, что мы на странице Analytics
        await expect(page).toHaveURL(/analytics/);
    });

    test('можно перейти на страницу Generator', async ({ page }) => {
        await page.goto('/');

        // Кликаем на кнопку Generator
        await page.getByRole('link', { name: /Generator/i }).click();

        // Проверяем, что мы на странице Generator
        await expect(page).toHaveURL(/generator/);
    });

    test('можно перейти на страницу History', async ({ page }) => {
        await page.goto('/');

        // Кликаем на кнопку History
        await page.getByRole('link', { name: /history/i }).click();

        // Проверяем, что мы на странице History
        await expect(page).toHaveURL(/history/);
    });
})
