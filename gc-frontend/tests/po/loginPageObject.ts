import { Locator, Page } from '@playwright/test';

export class loginPageObject{
    url = "http://localhost:4200/login"
    loginPage: Page;
    emailInput: Locator;
    passwordInput: Locator;
    signInButton: Locator;

    constructor(page: Page) {
        this.loginPage = page;
        this.emailInput = this.loginPage.getByLabel('Email address');
        this.passwordInput = this.loginPage.getByLabel('Password');
        this.signInButton = this.loginPage.getByRole('button', { name: 'Login' });        
    }

    async goTo(page: Page){
        await page.goto(this.url);
    }

    async login(email: string, password: string){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}