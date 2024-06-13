import { test, expect } from '@playwright/test';

test('mock an increase click on Counter 1', async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.goto('http://localhost:4200/login');
    await page.getByLabel('Email address').click();
    await page.getByLabel('Email address').fill('szankovszky.david@gmail.com');
    await page.getByLabel('Password').click();
    await page.getByLabel('Password').fill('b123456');
    await page.getByLabel('Password').press('CapsLock');
    await page.getByLabel('Password').fill('b123456B');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveTitle("Home");
    await page.route('http://localhost:8090/api/collections/counters/records/rgi9k9nfdsdhwxy', async route => {
        const json = {
            collectionId: "cco60agaiza9k3y",
            collectionName: "counters",
            counter_value: 1,
            created: "2024-05-14 11:00:49.084Z",
            id: "rgi9k9nfdsdhwxy",
            updated: "2024-06-12 06:44:36.378Z",
            user_id: "06oobnogdj9cg61"
        };
        route.fulfill({ json });
    });
    await page.getByRole('button', { name: 'Increase' }).first().click()
});