import { test, expect } from '@playwright/test';

test('should go to page not found component when login falied', async ({ page }) => {
  await page.goto('http://localhost:4200/log');
  await expect(page).toHaveTitle("Error 404!");
});