import { test, expect } from '@playwright/test';

test.describe('History Module', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/history');
    });

    test('всегда есть кнопка "Сгенерировать больше"', async ({ page }) => {
        // Эта кнопка всегда видна
        await expect(page.getByRole('button', { name: /Сгенерировать больше/i })).toBeVisible();
    });

    test('можно перейти на генератор через кнопку "Сгенерировать больше"', async ({ page }) => {
        // Кликаем на кнопку "Сгенерировать больше"
        await page.getByRole('button', { name: /Сгенерировать больше/i }).click();

        // Проверяем, что перешли на страницу генератора
        await expect(page).toHaveURL(/generator/);
    });

    test('отображается пустое состояние при отсутствии истории', async ({ page }) => {
        // Проверяем, что нет элементов истории
        // Это может быть текст "История пуста" или отсутствие элементов
        await expect(page.getByRole('button', { name: /Очистить всё/i })).not.toBeVisible();
        const historyItems = page.locator('[data-testid="history-item"]'); // если есть
        await expect(historyItems).toHaveCount(0);
    });
});