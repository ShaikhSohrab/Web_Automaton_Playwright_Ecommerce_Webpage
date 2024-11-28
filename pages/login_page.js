import { expect } from '@playwright/test';

class LoginPage {
    // All Locators of Login Page
    constructor(page) {

        this.page = page;

        this.loginButton = page.locator("id=login2");
        this.loginUserName = page.locator("id=loginusername");
        this.loginPassword = page.locator("id=loginpassword");
        this.loginSubmitButton = page.locator("//button[@onclick='logIn()']");
        this.loggedInUserName = page.locator("id=nameofuser");
        this.loginWindowCloseButton = page.locator("//button[@onclick='logIn()']/preceding-sibling::button[text()='Close']")
        this.loginWindowCloseIcon = page.locator("//h5[@id='logInModalLabel' and text()='Log in']/following-sibling::button[@aria-label='Close']")
    }

    async gotoHomePage() {
        await this.page.goto("/");
    }

    // perform Login with username and password
    async loginToWeb(user, password) {
        await this.loginButton.click()
        await this.loginUserName.fill(user)
        await this.loginPassword.fill(password)
        await this.loginSubmitButton.click()

    }

    async verifyLoginSuccess(expectedUserName) {

        await expect(this.loggedInUserName).toHaveText(`Welcome ${expectedUserName}`);

    }

    async verifyTitleAndURL(expectedTitle, expectedURL) {
        await expect(this.page).toHaveTitle(expectedTitle);
        await expect(this.page).toHaveURL(expectedURL);
    }

    // This function is used to close the popup window with close button
    async closePopupLoginWindow() {
        await this.loginButton.click();
        await this.loginWindowCloseButton.click();
        await expect(this.loginWindowCloseIcon).toBeHidden();
    }

    // This function is used to close the popup window with 'x' icon
    async xPopupLoginWindow() {
        await this.loginButton.click();
        await this.loginWindowCloseIcon.click();
        await expect(this.loginWindowCloseIcon).toBeHidden();
    }

}

module.exports = LoginPage;