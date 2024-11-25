const { chromium } = require('@playwright/test');

async function globalSetup() {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    const username = "SohrabShaikh";
    const userPassword = "SohrabShaikh";

    // Navigate to the website and click on Login
    await page.goto("https://www.demoblaze.com");
    await page.click("#login2");

    // Enter Username and Password
    await page.fill("#loginusername", username);
    await page.fill("#loginpassword", userPassword);
    await page.click("//button[@onclick='logIn()']");

    // Verify the user is logged in
    const loggedInUser = page.locator("#nameofuser");
    await loggedInUser.waitFor({ state: 'visible' });

    // Save storage state
    await context.storageState({ path: "./LoginAuth.json" });
    await browser.close();
}

module.exports = globalSetup;
