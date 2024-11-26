import {expect} from '@playwright/test';

class Checkout {

    constructor(page) {

        this.page = page;

        this.phoneCategoryButton =  page.locator("//a[@id='itemc' and text()='Phones']");
        this.samsungS6 =  page.locator("//a[@class='hrefch' and text()='Samsung galaxy s6']");
        this.addToCartButton = page.locator("//a[@class='btn btn-success btn-lg']");
        this.cartLink = page.locator("//a[@id='cartur']");
        this.placeOrderOnCartScreen = page.locator("//button[@class='btn btn-success']");
        this.nameFieldOnPlaceOrderForm = page.locator("//input[@id='name']");
        this.creditCartOnPlacedOrderForm = page.locator("//input[@id='card']");
        this.purchaseButtonOnPlaceOrderForm = page.locator("//button[@class='btn btn-primary' and text()='Purchase']");
      
    }

    async gotoHomePage(){
        await this.page.goto("/");
    }

    async placeOrderwithoutLogin(name="SohrabShaikh", creditCard="1234567890"){
        await this.phoneCategoryButton.click();
        await this.samsungS6.click();
        await this.addToCartButton.click();
        await this.cartLink.click();
        await this.placeOrderOnCartScreen.click();
        await this.nameFieldOnPlaceOrderForm.fill(name)
        await this.creditCartOnPlacedOrderForm.fill(creditCard)
        await this.purchaseButtonOnPlaceOrderForm.click();
    }

    async placeOrderWithoutItemInCart(name="SohrabShaikh", creditCard="1234567890"){
        await this.cartLink.click();
        await this.placeOrderOnCartScreen.click();
        await this.nameFieldOnPlaceOrderForm.fill(name)
        await this.creditCartOnPlacedOrderForm.fill(creditCard)
        await this.purchaseButtonOnPlaceOrderForm.click();
    }
    


}

module.exports=Checkout;