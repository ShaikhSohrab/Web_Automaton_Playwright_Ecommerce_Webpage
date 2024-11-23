import{Browser, chromium, expect, Page} from "@playwright/test";

async function globalSetup() {
    const browser: Browser = await chromium.launch({headless:false});
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    await page.goto("https://www.demoblaze.com");
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    await page.locator("id=loginusername").fill("SohrabShaikh");
    await page.locator("id=loginpassword").fill("SohrabShaikh");
    await page.click("//button[@onclick='logIn()']");
    const loggedInUser = page.locator("id=nameofuser")
    await expect(loggedInUser).toHaveText("Welcome SohrabShaikh");

    // Save the state of the webpage
    await page.context().storageState({path: "./LoginAuth.json"});

    await browser.close();

}

export default globalSetup;