const { test, expect } = require('@playwright/test');
const Checkout = require('../pages/checkout_page');


test("Verify Add to Cart", async ({ page }) => {

    const addItemsToCart = new Checkout(page);

    await addItemsToCart.gotoHomePage();
    await addItemsToCart.addItemsToCart();
})


test("Verify Cart and Place Order", async ({ page }) => {
    const checkoutWithItem = new Checkout(page);
    await checkoutWithItem.gotoCartPage();

    const expectedItems = ["Sony vaio i5", "Apple monitor 24", "Samsung galaxy s6"];
    await checkoutWithItem.verifyCartItems(expectedItems);

    await checkoutWithItem.checkoutWithItemInCart("SohrabShaikh", "1234567890098");

    const orderDetails = await checkoutWithItem.verifyOrderDetails();
    console.log("Order Details:", orderDetails);

    await checkoutWithItem.verifyOrderDetails();

    await checkoutWithItem.confirmOrder();

});


test("Try to place order without any item in cart", async ({ page }) => {
    const checkoutWithItem = new Checkout(page);
    // Goto Cart without adding any item in cart
    await checkoutWithItem.gotoCartPage();
    await page.waitForTimeout(2000);

    // Check if cart is empty
    const rowsInCartTable = await page.locator("//tbody[@id='tbodyid']/tr").count();

    await checkoutWithItem.checkoutWithItemInCart("SohrabShaikh", "1234567890098");

    //If_Else condition to check responce according to cart status
    if (rowsInCartTable === 0) {
        console.log("Order Placed Successfully, even though the cart is empty");
    } else {
        console.log("The order was placed successfully, with item in cart")
    }
})
