import { test, expect } from '@playwright/test';

test('login', async ({ page }) => {
  await page.goto('http://localhost:4200/login');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('szankovszky.david@gmail.com');
  await page.getByLabel('Email address').press('Tab');
  await page.getByLabel('Password').fill('b123456');
  await page.getByLabel('Password').press('CapsLock');
  await page.getByLabel('Password').fill('b123456B');
  await page.getByLabel('Password').press('CapsLock');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveTitle("Home");
});