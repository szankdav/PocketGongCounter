import { test, expect } from '@playwright/test';
import { loginPageObject } from './po/loginPageObject';

test.describe('login tests', () => {
  test.beforeEach(async ({ page }) => {
    const po = new loginPageObject(page);
    po.goTo(page);
  });

  test('login test with valid credentials', async ({ page }) => {
    const po = new loginPageObject(page);
    po.login('szankovszky.david@gmail.com', 'b123456B');
    await expect(page).toHaveTitle("Home");
  });

  test('login test with invalid credentials', async ({ page }) => {
    const po = new loginPageObject(page);
    po.login('szankovszky.david@gmail.com', 'b123456');
    await expect(page.getByText('Email address or password is')).toBeVisible();
  });
})