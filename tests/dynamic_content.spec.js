const { test, expect } = require("@playwright/test");
const HomePage = require('../pages/home_page');

test('Dynamic Content Verification', async ({ page }) => {
    const dynamicPage = new HomePage(page);

    let apiData = [];
    page.on('response', async (response) => {
        if (response.url().includes('https://api.demoblaze.com/bycat')) {
            try {
                const responseBody = await response.json();
                apiData = responseBody.Items;
            } catch (error) {
                console.error('Failed to parse API response:', error);
            }
        }
    });

    await dynamicPage.gotoHomePage();
    await page.click("//a[normalize-space(text())='Laptops']");
    await page.waitForTimeout(3000);
    const productUI = await page.locator('.card-title a').allTextContents();
    const productAPI = apiData.map(item => item.title);
    expect(productUI).toEqual(productAPI);
    console.log('UI and API data Matched');


})