import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/log');
  await expect(page).toHaveTitle("Error 404!");
});