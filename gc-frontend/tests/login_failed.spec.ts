import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/login');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Email address or password is')).toBeVisible();
});