const {test, expect} = require('@playwright/test')

// This is to prevent using LoginAuth of GlobalSetup
test.use({storageState:"./NoAuth.json"});

test("Verify if the URL is loaded and is same as expected", async ({page}) => {

    await page.goto("https://www.demoblaze.com");
    await expect(page).toHaveTitle("STORE");
    await expect(page).toHaveURL('https://www.demoblaze.com/');
    
});


test("Verify New User Registeration Flow", async ({page}) => {
    const initialUserName = 'SohrabShaikh';
    const dateTimeUser = Date.now();
    let alertAppeared = false;

    await page.goto("https://www.demoblaze.com", {waitUnitl:'networkidle'});
    await expect(page).toHaveTitle("STORE");

    const signup = page.locator('id=signin2');
    await signup.click();

    page.on('dialog', async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert");
        expect(alertMessage.message()).toContain("Sign up successful.");
        await alertMessage.dismiss();
    });

    const incrementedUserName = `${initialUserName}${dateTimeUser}`;
    await page.fill('id=sign-username', incrementedUserName);
    await page.fill('id=sign-password', "SohrabShaikh");
    await page.click('//button[@onclick="register()"]');

    await page.waitForTimeout(5000);

    if (alertAppeared) {
        console.log(`A new user was registered successfully with username: ${incrementedUserName}`);
    } else {
        console.log(`Error occurred during registration for username: ${incrementedUserName}`);
    }
    
});

test("Verify if already registerd user is able to register again", async ({page}) => {
    const userName = "SohrabShaikh";
    const userPass = "SohrabShaikh";
    let alertAppeared = false;

    page.on('alertMsg', async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("This user already exist.")
        await alertMessage.dismiss();
    })

    await page.goto("https://www.demoblaze.com", {waitUnitl:'commit'});
    const signupButton = await page.locator("id=signin2");
    signupButton.click();
    await page.fill("id=sign-username", userName);
    await page.fill("id=sign-password", userPass);
    await page.click("//button[@onclick='register()']");
})


test("1 Verify if user is able to register with only user name filled", async ({page}) => {
    
    page.on('alertMsg', async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    })

    await page.goto("https://www.demoblaze.com", {waitUnitl:'commit'});
    const signupButton = await page.locator("id=signin2");
    signupButton.click();
    await page.fill("id=sign-username", "tasdhufafgsr");
    await page.click("//button[@onclick='register()']");
})


test("2 Verify if user is able to register with only password filled", async ({page}) => {
    
    page.on('alertMsg', async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    })

    await page.goto("https://www.demoblaze.com", {waitUnitl:'commit'});
    const signupButton = await page.locator("id=signin2");
    signupButton.click();
    await page.fill("id=sign-password", "tasdhufafgsr");
    await page.click("//button[@onclick='register()']");
})


test("3 Verify if user is able to register without username and password", async ({page}) => {
    
    page.on('alertMsg', async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    })

    await page.goto("https://www.demoblaze.com", {waitUnitl:'commit'});
    const signupButton = await page.locator("id=signin2");
    signupButton.click();
    await page.click("//button[@onclick='register()']");
})


test("4 Verify if user is able to click on close button", async ({page}) => {
    
    await page.goto("https://www.demoblaze.com", {waitUnitl:'commit'});
    const signupButton = await page.locator("id=signin2");
    signupButton.click();
    await page.click("//button[@onclick='register()']/preceding-sibling::button[text()='Close']");
})


test("5 Verify if user is able to click on 'X' button", async ({page}) => {
    
    await page.goto("https://www.demoblaze.com", {waitUnitl:'commit'});
    const signupButton = await page.locator("id=signin2");
    signupButton.click();
    await page.click("//h5[@id='signInModalLabel']/following-sibling::button[@aria-label='Close']");
})


test("Login Flow for Registered User", async ({page}) => {
    const userName = "SohrabShaikh";
    const userPass = "SohrabShaikh";
    await page.goto("https://www.demoblaze.com", {waitUnitl:'commit'});
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    await page.fill("id=loginusername", userName);
    await page.fill("id=loginpassword", userPass);
    await page.click("//button[@onclick='logIn()']");
    const loggedInUser = page.locator("id=nameofuser")
    await expect(loggedInUser).toHaveText(`Welcome ${userName}`);
})


test("Login Flow with Invalid User Name", async ({page}) => {
    await page.goto("https://www.demoblaze.com");
    await page.waitForTimeout(2000);
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    await page.fill("id=loginusername", "Sohrabaikh");
    await page.fill("id=loginpassword", "SohrabShaikh");

    page.on('alertMsg', async (alertMessage) => {
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("User does not exist.")
        await alertMessage.dismiss();
    })

    await page.click("//button[@onclick='logIn()']");
})


test("Login Flow with Invalid User Password", async ({page}) => {
    await page.goto("https://www.demoblaze.com");
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    await page.fill("id=loginusername", "SohrabShaikh");
    await page.fill("id=loginpassword", "SohrabSikh");
    page.on('dialog', async (alertMessage) => {
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Wrong password.")
        await alertMessage.dismiss();
    })
    await page.click("//button[@onclick='logIn()']");
})


test("Login Flow without user name", async ({page}) => {
    await page.goto("https://www.demoblaze.com");
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    await page.fill("id=loginpassword", "SohrabSikh");
    page.on('dialog', async (alertMessage) => {
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    })
    await page.click("//button[@onclick='logIn()']");
})


test("Login Flow without Password", async ({page}) => {
    await page.goto("https://www.demoblaze.com");
    await page.waitForTimeout(2000);
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    await page.fill("id=loginusername", "SohrabShaikh");
    page.on('dialog', async (alertMessage) => {
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    })
    await page.click("//button[@onclick='logIn()']");  
})


test("Login Flow without UserName and Password", async ({page}) => {
    await page.goto("https://www.demoblaze.com");
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    page.on('dialog', async (alertMessage) => {
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    })
    await page.click("//button[@onclick='logIn()']");
})


test("Verify Close button behaviour on Login popup window", async ({page}) => {
    await page.goto("https://www.demoblaze.com");
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    await page.click("//button[@onclick='logIn()']/preceding-sibling::button[text()='Close']");
})


test("Verify 'X' button behaviour on Login popup window", async ({page}) => {
    await page.goto("https://www.demoblaze.com");
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    await page.click('//h5[@id="logInModalLabel" and text()="Log in"]/following-sibling::button[@aria-label="Close"]');
})
