import { Locator, Page } from '@playwright/test';

export class countersPageObject {
    countersPage: Page;
    increaseCounter: Locator;
    decreaseCounter: Locator;
    modifyCounter: Locator;
    deleteCounter: Locator;

    constructor(page: Page) {
        this.countersPage = page;
        this.increaseCounter = this.countersPage.getByRole('button', { name: 'Increase' })
        this.decreaseCounter = this.countersPage.getByRole('button', { name: 'Decrease' })
        this.modifyCounter = this.countersPage.getByAltText('Modify counter')
        this.deleteCounter = this.countersPage.getByAltText('Delete counter')
    }

    async increaseCounterByClick(page: Page) {
        const buttons = await this.increaseCounter.count();
        for (let i = 0; i < buttons; i++) {
            await this.increaseCounter.nth(i).click();
        }
    }

    async decreaseCounterByClick(page: Page) {
        const buttons = await this.decreaseCounter.count();
        for (let i = 0; i < buttons; i++) {
            await this.decreaseCounter.nth(i).click();
        }
    }
}