import { test, expect } from '@playwright/test';

test.describe('Generator Module', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/generator');
    });

    test('есть кнопка генерации данных', async ({ page }) => {
        await expect(page.getByRole('button', { name: /Начать генерацию/i })).toBeVisible();
    });
});