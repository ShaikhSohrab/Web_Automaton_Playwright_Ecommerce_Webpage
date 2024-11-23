import {test, expect} from '@playwright/test';

test("Verify Add to Cart", async ({page}) => {

    // Visiting Page and wait untill DOM is loaded
    await page.goto("https://www.demoblaze.com", {waitUntil:'domcontentloaded'});
    const checkUser = page.getByText('Welcome SohrabShaikh');
    await expect(checkUser).toBeVisible();

    // Adding click on Phone as in near future the Home page might change.
    // Adding Item from Category: Phones Using Custom Xpaths
    await page.click('//a[@id="itemc" and text()="Phones"]');
    await page.click('//a[@class="hrefch" and text()="Samsung galaxy s6"]');
    await page.click('//a[@class="btn btn-success btn-lg"]');
    await page.click('//a[@class="nav-link"and text()="Home "]');

    // Adding Item from Category: Laptops with playwright locators
    await page.click('//a[@id="itemc"and text()="Laptops"]');
    await page.click('//a[@class="hrefch"and text()="Sony vaio i5"]');
    await page.click('//a[@class="btn btn-success btn-lg"]');
    await page.click('//a[@class="nav-link"and text()="Home "]');

    // Adding Item from Category: Monitor
    await page.click('//a[@id="itemc"and text()="Monitors"]');
    await page.click('//a[@class="hrefch"and text()="Apple monitor 24"]');
    await page.click('//a[@class="btn btn-success btn-lg"]');

})

test("Verify Cart and Place Order", async ({page}) => {

    // Verify Cart Items by their Name individually
    await page.goto('https://www.demoblaze.com/cart.html')

    // List of expected item names to verify in the cart
    const expectedItems = ['Sony vaio i5', 'Apple monitor 24', 'Samsung galaxy s6'];

    // Loop through each expected item and verify it's in the cart
    for (const itemName of expectedItems) {
        const item = await page.locator(`//td[normalize-space(text())='${itemName}']`);
        const itemText = await item.textContent();
        expect(itemText).toContain(itemName);
    }

    // Proceed Checkout 
    await page.click('//button[@class="btn btn-success"]');
    await page.locator('//input[@id="name"]').fill('SohrabShaikh');
    await page.locator('//input[@id="card"]').fill('1234567890');
    await page.click('//button[@class="btn btn-primary" and text()="Purchase"]');

    // Check Data after place order 
    const confirmationModal = page.locator('//div[contains(@class, "sweet-alert") and contains(@class, "visible")]');
    await expect(confirmationModal).toBeVisible();
    const detailsText = await page.locator('//p[@class="lead text-muted "]').textContent();
    const singleLineDetails = detailsText.replace(/\n/g, ', ');
    console.log('Order Details:', singleLineDetails);

    await page.click('//button[normalize-space(text())="OK"]');
    
})