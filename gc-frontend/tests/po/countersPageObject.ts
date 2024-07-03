import { Locator, Page } from '@playwright/test';

export class countersPageObject {
    countersPage: Page;
    increaseCounterButton: Locator;
    decreaseCounterButton: Locator;
    modifyCounterButton: Locator;
    deleteCounterButton: Locator;

    constructor(page: Page) {
        this.countersPage = page;
        this.increaseCounterButton = this.countersPage.getByRole('button', { name: 'Increase' })
        this.decreaseCounterButton = this.countersPage.getByRole('button', { name: 'Decrease' })
        this.modifyCounterButton = this.countersPage.getByAltText('Modify counter')
        this.deleteCounterButton = this.countersPage.getByAltText('Delete counter')
    }

    async increaseCounter(page: Page) {
        const buttons = await this.increaseCounterButton.count();
        for (let i = 0; i < buttons; i++) {
            await this.increaseCounterButton.nth(i).click();
        }
    }

    async decreaseCounter(page: Page) {
        const buttons = await this.decreaseCounterButton.count();
        for (let i = 0; i < buttons; i++) {
            await this.decreaseCounterButton.nth(i).click();
        }
    }

    async deleteCounter(page: Page, i: number){
        await this.deleteCounterButton.nth(i).click();
    }

    async modifyCounter(page: Page, i: number){
        await this.modifyCounterButton.nth(i).click();
    }
}