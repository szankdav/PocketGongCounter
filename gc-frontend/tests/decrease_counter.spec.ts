import { test, expect } from '@playwright/test';
import { loginPageObject } from './po/loginPageObject';
import { countersPageObject } from './po/countersPageObject';

test('mock a decrease click on counters', async ({ page }) => {
    const loginPo = new loginPageObject(page);
    const counterPo = new  countersPageObject(page);
    loginPo.goTo(page);
    loginPo.login('szankovszky.david@gmail.com', 'b123456B');
    await page.route('http://localhost:8090/api/collections/counters/records?filter=user_id=%2206oobnogdj9cg61%22', async route => {
        const json = {
            items: [
                {
                    "collectionId": "coll_ID",
                    "collectionName": "counters",
                    "counter_name": "Mock1",
                    "counter_value": 1,
                    "created": "2024-06-10 10:07:18.216Z",
                    "id": "counter_ID",
                    "updated": "2024-06-24 11:45:21.414Z",
                    "user_id": "user_ID"
                  },
                  {
                    "collectionId": "coll_ID",
                    "collectionName": "counters",
                    "counter_name": "Mock2",
                    "counter_value": 50,
                    "created": "2024-06-10 10:07:24.015Z",
                    "id": "counter_ID",
                    "updated": "2024-06-24 11:45:32.619Z",
                    "user_id": "user_ID"
                  }
            ]
        };
        route.fulfill({ json });
    });
    await expect(page).toHaveTitle("Home");
    await counterPo.decreaseCounter(page);
    await expect(page.getByTitle('Mock1')).toHaveText("0")
    await expect(page.getByTitle('Mock2')).toHaveText("49")
});