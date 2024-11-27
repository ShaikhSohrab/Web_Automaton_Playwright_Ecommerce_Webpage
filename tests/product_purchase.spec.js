const { test, expect } = require('@playwright/test');
const Checkout = require('../pages/checkout_page');


test("Verify Add to Cart", async ({ page }) => {

    const addItemsToCart = new Checkout(page);

    await addItemsToCart.gotoHomePage();
    await addItemsToCart.addItemsToCart();
})


test("Verify Cart and Place Order", async ({ page }) => {
    const checkoutWithItem = new Checkout(page);

    // Verify Cart Items by their Name individually
    await checkoutWithItem.gotoCartPage();

    // List of expected item names to verify in the cart
    const expectedItems = ["Sony vaio i5", "Apple monitor 24", "Samsung galaxy s6"];

    // Loop through each expected item and verify it's in the cart
    await checkoutWithItem.verifyCartItems(expectedItems);

    // Proceed Checkout 
    await checkoutWithItem.checkoutWithItemInCart("SohrabShaikh", "1234567890098");

    const orderDetails = await checkoutWithItem.verifyOrderDetails();
    console.log("Order Details:", orderDetails);

    // Check Data after place order 
    await checkoutWithItem.verifyOrderDetails();

    await checkoutWithItem.confirmOrder();

});


test("Try to place order without any item in cart", async ({ page }) => {
    const checkoutWithItem = new Checkout(page);
    // Goto Cart without adding any item in cart
    await checkoutWithItem.gotoCartPage();
    await page.waitForTimeout(2000);

    // Check if cart is empty by looking into table element
    const rowsInCartTable = await page.locator("//tbody[@id='tbodyid']/tr").count();

    //Click on Purchase Button and fill Details 
    await checkoutWithItem.checkoutWithItemInCart("SohrabShaikh", "1234567890098");

    //If..Else condition to check responce according to cart status
    if (rowsInCartTable === 0) {
        console.log("Order Placed Successfully, even though the cart is empty");
    } else {
        console.log("The order was placed successfully, with item in cart")
    }
})
