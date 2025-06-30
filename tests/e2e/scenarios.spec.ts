import { test, expect } from '@playwright/test';

test.describe('Сценарий использования приложения юзером от начала до конца', () => {
    test('загрузка файла-анализ-просмотр истории', async ({ page }) => {
        await page.goto('/analytics');
        await page.route('**/aggregate**', async route => {
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

        const fileInput = page.locator('input[type="file"]');
        const filePath = 'tests/fixtures/test-data.csv';
        await fileInput.setInputFiles(filePath);

        await page.getByRole('button', { name: /Отправить/i }).click();

        await expect(page.getByText('1000')).toBeVisible();
        await expect(page.getByText('Alpha')).toBeVisible();

        await page.getByRole('link', { name: /History/i }).click();
        await expect(page).toHaveURL(/history/);

        await expect(page.getByText('test-data.csv')).toBeVisible();

        await page.getByText('test-data.csv').click();

        await expect(page.getByText('Alpha')).toBeVisible();
        await expect(page.getByText('Delta')).toBeVisible();
    });

    test('генерация данных-загрузка-анализ', async ({ page }) => {
        await page.goto('/generator');

        await page.route('**/report**', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'text/csv',
                body: 'civ,spend,date\nGenerated1,100,1\nGenerated2,200,2'
            });
        });

        await page.getByRole('button', { name: /Начать генерацию/i }).click();
        await expect(page.getByText(/файл сгенерирован/i)).toBeVisible();

        await page.getByRole('link', { name: /Analytics/i }).click();
        await expect(page).toHaveURL(/analytics/);

        await page.route('**/aggregate**', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    rows_affected: 2,
                    total_spend_galactic: 300,
                    less_spent_civ: 'Generated1',
                    big_spent_civ: 'Generated2'
                })
            });
        });

        const fileInput = page.locator('input[type="file"]');
        const filePath = 'tests/fixtures/test-data.csv'; // используем тестовый файл
        await fileInput.setInputFiles(filePath);

        await page.getByRole('button', { name: /Отправить/i }).click();

        await expect(page.getByText('300')).toBeVisible();
    });

});