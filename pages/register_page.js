import { expect } from '@playwright/test';

class RegisterPage {

    // All Locators related to Register/Signup Page
    constructor(page) {

        this.page = page;

        this.signUpButton = page.locator("id=signin2");
        this.signUpUserName = page.locator("id=sign-username");
        this.signUpPassword = page.locator("id=sign-password");
        this.signUpSubmitButton = page.locator("//button[@onclick='register()']");
        this.signUpWindowCloseButton = page.locator("//button[@onclick='register()']/preceding-sibling::button[text()='Close']");
        this.signUpWindowCloseIcon = page.locator("//h5[@id='signInModalLabel']/following-sibling::button[@aria-label='Close']");

    }

    async gotoHomePage() {
        await this.page.goto("/");
    }

    // This function is used to register on webpage
    async registerOnWeb(user, password) {
        await this.signUpButton.click();
        await this.signUpUserName.fill(user);
        await this.signUpPassword.fill(password);
        await this.signUpSubmitButton.click();

    }

    // This function is used to close the Register popup windown with Close button
    async closePopupSignUpWindow() {
        await this.signUpButton.click();
        await this.signUpWindowCloseButton.click();
        await expect(this.signUpWindowCloseButton).toBeHidden();
    }

    // This function is used to close the Register popup windown with 'x' icon
    async xPopupSignupWindow() {
        await this.signUpButton.click();
        await this.signUpWindowCloseIcon.click();
        await expect(this.signUpWindowCloseIcon).toBeHidden();
    }

}

module.exports = RegisterPage;