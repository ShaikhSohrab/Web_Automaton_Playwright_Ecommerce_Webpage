import { expect } from '@playwright/test';

class Checkout {

    // All locators for this page
    constructor(page) {

        this.page = page;
        
        this.phoneCategoryButton = page.locator("//a[@id='itemc' and text()='Phones']");
        this.samsungS6 = page.locator("//a[@class='hrefch' and text()='Samsung galaxy s6']");
        this.addToCartButton = page.locator("//a[@class='btn btn-success btn-lg']");
        this.cartLink = page.locator("//a[@id='cartur']");
        this.placeOrderOnCartScreen = page.locator("//button[@class='btn btn-success']");
        this.nameFieldOnPlaceOrderForm = page.locator("//input[@id='name']");
        this.creditCartOnPlacedOrderForm = page.locator("//input[@id='card']");
        this.purchaseButtonOnPlaceOrderForm = page.locator("//button[@class='btn btn-primary' and text()='Purchase']");
        this.gotoHomeScreen = page.locator("//a[@class='nav-link' and text()='Home ']");
        this.laptopCategoryButton = page.locator("//a[@id='itemc' and text()='Laptops']");
        this.sonyVaioi5 = page.locator("//a[@class='hrefch' and text()='Sony vaio i5']");
        this.monitorCatrgoryButton = page.locator("//a[@id='itemc' and text()='Monitors']");
        this.appleMonitor24 = page.locator("//a[@class='hrefch' and text()='Apple monitor 24']");
        this.orderDetails = page.locator("//p[@class='lead text-muted ']");
        this.confirmationModal = page.locator("//div[contains(@class, 'sweet-alert') and contains(@class, 'visible')]");
        this.okButton = page.locator("//button[normalize-space(text())='OK']");

    }

    async gotoHomePage() {
        await this.page.goto("/");
    }

    // This function is used to Place Order without Login (Negative Case)
    async placeOrderwithoutLogin(name = "SohrabShaikh", creditCard = "1234567890") {
        await this.phoneCategoryButton.click();
        await this.samsungS6.click();
        await this.addToCartButton.click();
        await this.cartLink.click();
        await this.placeOrderOnCartScreen.click();
        await this.nameFieldOnPlaceOrderForm.fill(name)
        await this.creditCartOnPlacedOrderForm.fill(creditCard)
        await this.purchaseButtonOnPlaceOrderForm.click();
    }

    // This function is used to Place Order without items in cart (Negative Case)
    async placeOrderWithoutItemInCart(name = "SohrabShaikh", creditCard = "1234567890") {
        await this.cartLink.click();
        await this.placeOrderOnCartScreen.click();
        await this.nameFieldOnPlaceOrderForm.fill(name)
        await this.creditCartOnPlacedOrderForm.fill(creditCard)
        await this.purchaseButtonOnPlaceOrderForm.click();
    }

    // This function is user to add specific Items in cart
    async addItemsToCart() {
        await this.phoneCategoryButton.click();
        await this.samsungS6.click();
        await this.addToCartButton.click();
        await this.gotoHomeScreen.click();
        await this.laptopCategoryButton.click();
        await this.sonyVaioi5.click();
        await this.addToCartButton.click();
        await this.gotoHomeScreen.click();
        await this.monitorCatrgoryButton.click();
        await this.appleMonitor24.click();
        await this.addToCartButton.click();

    }

    async gotoCartPage() {
        await this.page.goto("https://www.demoblaze.com/cart.html", { waitUntil: "domcontentloaded" })
    }

    // This function if for checkout with Items in cart
    async checkoutWithItemInCart(name, card) {
        await this.placeOrderOnCartScreen.click();
        await this.nameFieldOnPlaceOrderForm.fill(name);
        await this.creditCartOnPlacedOrderForm.fill(card);
        await this.purchaseButtonOnPlaceOrderForm.click();
        await this.page.waitForTimeout(3000);
    }

    // This function is to verify cart with Items added in cart
    async verifyCartItems(expectedItems) {
        for (const itemName of expectedItems) {
            const item = await this.page.locator(`//td[normalize-space(text())="${itemName}"]`);
            await item.waitFor({timeout: 5000});
            const itemText = await item.textContent();
            expect(itemText).toContain(itemName);
        }
    }

    // This function is to Verify the Order details like Name of user, Order Number, Date of Order, etc. after placing order 
    async verifyOrderDetails() {
        await expect(this.confirmationModal).toBeVisible();
        const detailsText = await this.orderDetails.textContent();
        const singleLineDetails = detailsText.replace(/\n/g, ', ');
        return singleLineDetails;
    }

    async confirmOrder() {
        await this.okButton.click();
    }

}

module.exports = Checkout;