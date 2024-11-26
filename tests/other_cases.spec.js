import { test, expect } from '@playwright/test';
const HomePage = require('../pages/home_page');
const Checkout = require('../pages/checkout_page');

// This is to prevent using LoginAuth of GlobalSetup
test.use({ storageState: "./NoAuth.json" });

test("Check Next and Previous Button behaviour on Home screen", async ({ page }) => {

  const checkNextPreviousButton = new HomePage(page);
  await checkNextPreviousButton.gotoHomePage();
  await checkNextPreviousButton.checkNextPreviousButton();
});


test("Verify if user is able to place order without login", async ({ page }) => {

  const checkoutWithoutLogin = new Checkout(page);
  await checkoutWithoutLogin.gotoHomePage();
  await checkoutWithoutLogin.placeOrderwithoutLogin();

});

test.only("Verify if user is able to place order without login and any item in cart", async ({ page }) => {

  const checkoutWithoutItem = new Checkout(page);
  await checkoutWithoutItem.gotoHomePage();
  await checkoutWithoutItem.placeOrderWithoutItemInCart();

});


//Shift this case in Login and Register

