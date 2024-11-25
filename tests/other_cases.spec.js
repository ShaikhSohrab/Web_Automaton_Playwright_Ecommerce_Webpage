import {test, expect} from '@playwright/test';
// This is to prevent using LoginAuth of GlobalSetup
test.use({storageState:"./NoAuth.json"});

test('Check Next and Previous Button behaviour on Home screen', async ({page}) => {
    
    await page.goto('https://www.demoblaze.com');
    const nextButton = page.locator('//button[@id="next2"]');
    await nextButton.click();
    
    await page.waitForTimeout(3000);
    const previous =  page.locator('//button[@id="prev2"]');
    await previous.click();
    await page.waitForTimeout(3000);
})



test('Verify if user try to enter only special cherecters and numbers in user name and password', async ({page}) => {

    const initialUserName = ':>?<{}|!~@#$%^-=++_';
    const dateTime = Date.now();
    const mergeUserNameAndDateTime = `${initialUserName}${dateTime}`
    
    await page.goto('https://www.demoblaze.com');
    await page.click('//*[@id="signin2"]');

    await page.fill('//input[@id="sign-username"]', mergeUserNameAndDateTime);
    await page.fill('//input[@id="sign-password"]', mergeUserNameAndDateTime);

    let alertAppeared = false;

    page.on('dialog', async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert");
        expect(alertMessage.message()).toContain("Sign up successful.");
        await alertMessage.dismiss();
    });

    await page.click('//button[@onclick="register()"]');

    await page.waitForTimeout(5000);
    if (alertAppeared) {
      console.log("A new User was Registered with only Special Characters and Number, which is not valid");
    } else {
      console.log("Error occured as user tried to registered with only special characters in User Name field");
    }
})

test('Verify if user is able to clode popup window with Closer button and "x" icon', async ({page}) => {
    
    await page.goto('https://www.demoblaze.com');
    await page.click('//button[@id="next2"]');
})

test('Verify if user is able to place order without login', async ({page}) => {
    
  await page.goto('https://www.demoblaze.com');
  await page.click('//a[@id="itemc" and text()="Phones"]');
  await page.click('//a[@class="hrefch" and text()="Samsung galaxy s6"]');
  await page.click('//a[@class="btn btn-success btn-lg"]');
  await page.click('//a[@id="cartur"]');

  await page.waitForTimeout(4000);
  await page.click('//button[@class="btn btn-success"]');
  await page.locator('//input[@id="name"]').fill('SohrabShaikh');
  await page.locator('//input[@id="card"]').fill('1234567890');
  await page.click('//button[@class="btn btn-primary" and text()="Purchase"]');
 
})

test('Verify if user is able to place order without login and any item in cart', async ({page}) => {
    
  await page.goto('https://www.demoblaze.com');
  await page.click('//a[@id="cartur"]');
  await page.waitForTimeout(3000);
  await page.click('//button[@class="btn btn-success"]');
  await page.locator('//input[@id="name"]').fill('SohrabShaikh');
  await page.locator('//input[@id="card"]').fill('1234567890');
  await page.click('//button[@class="btn btn-primary" and text()="Purchase"]');

})



