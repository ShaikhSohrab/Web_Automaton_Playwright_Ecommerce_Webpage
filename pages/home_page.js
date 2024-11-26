import {expect} from '@playwright/test';

class HomePage {

    constructor(page) {

        this.page = page;

        this.nextButton = page.locator("//button[@id='next2']");
        this.previousButton = page.locator("//button[@id='prev2']");

    }

    async gotoHomePage(){
        await this.page.goto("/");
    }

    async checkNextPreviousButton(){
        await this.nextButton.click();
        await this.previousButton.click();
    }


}

module.exports=HomePage;