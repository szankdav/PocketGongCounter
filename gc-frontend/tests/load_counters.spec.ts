import { test, expect } from '@playwright/test';
import { loginPageObject } from './po/loginPageObject';

test('mock an increase click on Counter 1', async ({ page }) => {
  const po = new loginPageObject(page);
  po.goTo(page);
  po.login('szankovszky.david@gmail.com', 'b123456B');
  await expect(page).toHaveTitle("Home");
  await page.route('http://localhost:8090/api/collections/counters/records?filter=user_id=%2206oobnogdj9cg61%22', async route => {
    const json = {
      items: [
        {
          collectionId: "cco60agaiza9k3y",
          collectionName: "counters",
          counter_value: 1,
          created: "2024-05-14 11:00:49.084Z",
          id: "rgi9k9nfdsdhwxy",
          updated: "2024-06-11 09:38:34.915Z",
          user_id: "06oobnogdj9cg61"
        },
        {
          collectionId: "cco60agaiza9k3y",
          collectionName: "counters",
          counter_value: 2,
          created: "2024-06-10 10:07:29.948Z",
          id: "y3m85ea29b7gdtg",
          updated: "2024-06-11 09:10:41.075Z",
          user_id: "06oobnogdj9cg61"
        },
        {
          collectionId: "cco60agaiza9k3y",
          collectionName: "counters",
          counter_value: 3,
          created: "2024-06-10 10:07:34.560Z",
          id: "yhcn6fnbnne5cx0",
          updated: "2024-06-11 09:38:36.687Z",
          user_id: "06oobnogdj9cg61"
        },
        {
          collectionId: "cco60agaiza9k3y",
          collectionName: "counters",
          counter_value: 4,
          created: "2024-06-10 10:07:38.685Z",
          id: "gbu7pji5cb04dar",
          updated: "2024-06-11 09:38:36.084Z",
          user_id: "06oobnogdj9cg61"
        }
      ]
    };
    route.fulfill({json});
  });
  await page.goto('http://localhost:4200/home');
});