const {test, expect} = require('@playwright/test')

// This is to prevent using LoginAuth of GlobalSetup
test.use({storageState:"./NoAuth.json"});

test("first Case", async ({page}) => {

    await page.goto("https://www.demoblaze.com");

    await expect(page).toHaveTitle("STORE");

    await expect(page).toHaveURL('https://www.demoblaze.com/');
    
});

test("User Registeration Flow", async ({page}) => {

    await page.goto("https://www.demoblaze.com");

    await page.waitForTimeout(5000);

    await expect(page).toHaveTitle("STORE");

    const signup = page.locator('id=signin2');

    await signup.click();

    await page.locator('id=sign-username').fill("SohrabShaikh");

    await page.locator('id=sign-password').fill("SohrabShaikh");

    await page.click('//button[@onclick="register()"]');

    await page.waitForTimeout(5000);
    
});

test("Login Flow for Registered User", async ({page}) => {
    await page.goto("https://www.demoblaze.com");
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    await page.locator("id=loginusername").fill("SohrabShaikh");
    await page.locator("id=loginpassword").fill("SohrabShaikh");
    await page.click("//button[@onclick='logIn()']");
    const loggedInUser = page.locator("id=nameofuser")
    await expect(loggedInUser).toHaveText("Welcome SohrabShaikh");
})

test.only("Login Flow with Invalid User Name", async ({page}) => {
    await page.goto("https://www.demoblaze.com");
    await page.waitForTimeout(2000);

    const loginButton = await page.locator("id=login2");

    loginButton.click();

    await page.locator("id=loginusername").fill("Sohrabaikh");

    await page.locator("id=loginpassword").fill("SohrabShaikh");

    page.on('alertMsg', async (alertMessage) => {

        expect(alertMessage.type()).toContain("alert")

        expect(alertMessage.message()).toContain("User does not exist.")

        await alertMessage.dismiss();
    })

    await page.click("//button[@onclick='logIn()']");

    await page.waitForTimeout(10000);
    
    
})

test("Login Flow with Invalid User Password", async ({page}) => {
    await page.goto("https://www.demoblaze.com");
    await page.waitForTimeout(2000);

    const loginButton = await page.locator("id=login2");

    loginButton.click();

    await page.locator("id=loginusername").fill("SohrabShaikh");

    await page.locator("id=loginpassword").fill("SohrabSikh");

    page.on('dialog', async (alertMessage) => {

        expect(alertMessage.type()).toContain("alert")

        expect(alertMessage.message()).toContain("Wrong password.")

        await alertMessage.dismiss();
    })

    await page.click("//button[@onclick='logIn()']");

    await page.waitForTimeout(5000);
    
    
})

test("Login Flow without user name", async ({page}) => {
    await page.goto("https://www.demoblaze.com");
    await page.waitForTimeout(2000);

    const loginButton = await page.locator("id=login2");

    loginButton.click();

    await page.locator("id=loginpassword").fill("SohrabSikh");

    page.on('dialog', async (alertMessage) => {

        expect(alertMessage.type()).toContain("alert")

        expect(alertMessage.message()).toContain("Please fill out Username and Password.")

        await alertMessage.dismiss();
    })

    await page.click("//button[@onclick='logIn()']");

    await page.waitForTimeout(5000);
    
    
})

test("Login Flow without Password", async ({page}) => {
    await page.goto("https://www.demoblaze.com");
    await page.waitForTimeout(2000);

    const loginButton = await page.locator("id=login2");

    loginButton.click();

    await page.locator("id=loginusername").fill("SohrabShaikh");

    page.on('dialog', async (alertMessage) => {

        expect(alertMessage.type()).toContain("alert")

        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        
        await alertMessage.dismiss();
    })

    await page.click("//button[@onclick='logIn()']");

    await page.waitForTimeout(5000);
    
    
})


test("Login Flow without UserName and Password", async ({page}) => {
    await page.goto("https://www.demoblaze.com");
    await page.waitForTimeout(2000);

    const loginButton = await page.locator("id=login2");

    loginButton.click();

    page.on('dialog', async (alertMessage) => {

        expect(alertMessage.type()).toContain("alert")

        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        
        await alertMessage.dismiss();
    })

    await page.click("//button[@onclick='logIn()']");

    await page.waitForTimeout(5000);
    
    
})