const {test, expect} = require("@playwright/test")

// This is to prevent using LoginAuth of GlobalSetup
test.use({storageState:"./NoAuth.json"});

test("Verify if the URL is loaded and is same as expected", async ({page}) => {
    await page.goto("/");
    await expect(page).toHaveTitle("STORE");
    await expect(page).toHaveURL("https://www.demoblaze.com/");
    
});


test("Verify New User Registeration Flow", async ({page}) => {

// Defile User Name and join Username with Date and Time to have unique Username everytime
    const initialUserName = "SohrabShaikh";
    const dateTimeUser = Date.now();
    let alertAppeared = false;

// Goto webpage
    await page.goto("/");
    await expect(page).toHaveTitle("STORE");

    const signup = page.locator("id=signin2");
    await signup.click();

    page.on("dialog", async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert");
        expect(alertMessage.message()).toContain("Sign up successful.");
        await alertMessage.accept();
    });

    const incrementedUserName = `${initialUserName}${dateTimeUser}`;
    await page.fill("id=sign-username", incrementedUserName);
    await page.fill("id=sign-password", "SohrabShaikh");
    await page.click("//button[@onclick='register()']");

    await page.waitForTimeout(5000);

    if (alertAppeared) {
        console.log(`A new user was registered successfully with username: ${incrementedUserName}`);
    } else {
        console.log(`Error occurred during registration for username: ${incrementedUserName}`);
    }
    
    expect(alertAppeared).toBeTruthy();
});

test("Verify if already registerd user is able to register again", async ({page}) => {
    const userName = "SohrabShaikh";
    const userPass = "SohrabShaikh";
    let alertAppeared = false;

    page.on("dialog", async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert");
        expect(alertMessage.message()).toContain("This user already exist.");
        await alertMessage.accept();
    });

    await page.goto("/");
    const signupButton = await page.locator("id=signin2");
    signupButton.click();
    await page.fill("id=sign-username", userName);
    await page.fill("id=sign-password", userPass);
    await page.click("//button[@onclick='register()']");
    await page.waitForTimeout(5000);
    console.log("Register button Clicked")
    
    expect(alertAppeared).toBeTruthy();
});


test("Verify if user is able to register with only Username filled", async ({page}) => {
    let alertAppeared = false;
    page.on("dialog", async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    });

    await page.goto("/");
    const signupButton = await page.locator("id=signin2");
    signupButton.click();
    await page.fill("id=sign-username", "tasdhufafgsr");
    await page.click("//button[@onclick='register()']");

    expect(alertAppeared).toBeTruthy();
});


test("Verify if user is able to register with only password filled", async ({page}) => {
    let alertAppeared = false;
    
    page.on('dialog', async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    });

    await page.goto("/");
    const signupButton = await page.locator("id=signin2");
    signupButton.click();
    await page.fill("id=sign-password", "tasdhufafgsr");
    await page.click("//button[@onclick='register()']");

    expect(alertAppeared).toBeTruthy();
});


test("Verify if user is able to register without username and password", async ({page}) => {
    let alertAppeared = false;

    page.on("dialog", async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    })

    await page.goto("/");
    const signupButton = await page.locator("id=signin2");
    signupButton.click();
    await page.click("//button[@onclick='register()']");

    expect(alertAppeared).toBeTruthy();
});


test("Verify if user is able to click on close button from Register popup Window", async ({page}) => {
    
    await page.goto("/");
    const signupButton = await page.locator("id=signin2");
    signupButton.click();
    const closeButton = await page.locator("//button[@onclick='register()']/preceding-sibling::button[text()='Close']");
    await closeButton.click();
    await expect(closeButton).toBeHidden();
})


test("Verify if user is able to click on 'X' button from Register popup Window", async ({page}) => {
    
    await page.goto("/");
    const signupButton = await page.locator("id=signin2");
    signupButton.click();
    const closeIcon = await page.locator("//h5[@id='signInModalLabel']/following-sibling::button[@aria-label='Close']");
    await closeIcon.click();
    await expect(closeIcon).toBeHidden();
});


test("Login Flow for Registered User", async ({page}) => {
    const userName = "SohrabShaikh";
    const userPass = "SohrabShaikh";
    await page.goto("/");
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    await page.fill("id=loginusername", userName);
    await page.fill("id=loginpassword", userPass);
    await page.click("//button[@onclick='logIn()']");
    const loggedInUser = page.locator("id=nameofuser")
    await expect(loggedInUser).toHaveText(`Welcome ${userName}`);
});


test("Login Flow with Invalid User Name", async ({page}) => {
    let alertAppeared = false;

    page.on("dialog", async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert");
        expect(alertMessage.message()).toContain("User does not exist.");
        await alertMessage.dismiss();
    });

    await page.goto("/");
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    await page.fill("id=loginusername", "Sohrabaikh");
    await page.fill("id=loginpassword", "SohrabShaikh");

    await page.click("//button[@onclick='logIn()']");
    await page.waitForTimeout(2000);

    expect(alertAppeared).toBeTruthy();
});


test("Login Flow with Invalid User Password", async ({page}) => {
    let alertAppeared = false;

    page.on('dialog', async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Wrong password.")
        await alertMessage.dismiss();
    });
    await page.goto("/");
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    await page.fill("id=loginusername", "SohrabShaikh");
    await page.fill("id=loginpassword", "SohrabSikh");
    await page.click("//button[@onclick='logIn()']");
    await page.waitForTimeout(2000);

    expect(alertAppeared).toBeTruthy();

});


test("Login Flow without user name", async ({page}) => {
    let alertAppeared = false;

    page.on('dialog', async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    });
    await page.goto("/");
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    await page.fill("id=loginpassword", "SohrabSikh");

    await page.click("//button[@onclick='logIn()']");
    await page.waitForTimeout(3000);

    expect(alertAppeared).toBeTruthy();
})


test("Login Flow without Password", async ({page}) => {
    let alertAppeared = false;
    page.on('dialog', async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    })
    await page.goto("/");
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    await page.fill("id=loginusername", "SohrabShaikh");

    await page.click("//button[@onclick='logIn()']");  
    await page.waitForTimeout(3000);

    expect(alertAppeared).toBeTruthy();
})


test("Login Flow without UserName and Password", async ({page}) => {
    let alertAppeared = false;

    page.on('dialog', async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    });
    await page.goto("/");
    const loginButton = await page.locator("id=login2");
    loginButton.click();

    await page.click("//button[@onclick='logIn()']");
    expect(alertAppeared).toBeTruthy();
});


test("Verify Close button behaviour on Login popup window", async ({page}) => {
    await page.goto("/");
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    const closeButtonLogin = await page.locator("//button[@onclick='logIn()']/preceding-sibling::button[text()='Close']")
    await closeButtonLogin.click();

    await expect(closeButtonLogin).toBeHidden();
});


test("Verify 'X' button behaviour on Login popup window", async ({page}) => {
    await page.goto("/");
    const loginButton = await page.locator("id=login2");
    loginButton.click();
    const closeIconLogin = await page.locator("//h5[@id='logInModalLabel' and text()='Log in']/following-sibling::button[@aria-label='Close']");
    await closeIconLogin.click();

    await expect(closeIconLogin).toBeHidden();
})
