const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login_page');


// This is to prevent using LoginAuth of GlobalSetup
test.use({ storageState: "./NoAuth.json" });

test("Verify if the URL is loaded and is same as expected", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoHomePage();
    await loginPage.verifyTitleAndURL("STORE", "https://www.demoblaze.com");

});


test("Login Flow for Registered User", async ({ page }) => {
    const userName = "SohrabShaikh";
    const userPass = "SohrabShaikh";

    const Login = new LoginPage(page);

    await Login.gotoHomePage();
    await Login.loginToWeb(userName, userPass);
    await Login.verifyLoginSuccess(userName);
});


test("Login Flow with Invalid User Name", async ({ page }) => {
    let alertAppeared = false;

    page.on("dialog", async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert");
        expect(alertMessage.message()).toContain("User does not exist.");
        await alertMessage.dismiss();
    });

    const failLogin = new LoginPage(page);

    await failLogin.gotoHomePage();
    await failLogin.loginToWeb("Sohrabshakih","SohrabShaikh");
    await page.waitForTimeout(3000);
    expect(alertAppeared).toBeTruthy();
});


test("Login Flow with Invalid User Password", async ({ page }) => {
    let alertAppeared = false;

    page.on('dialog', async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Wrong password.")
        await alertMessage.dismiss();
    });

    const failedLogin = new LoginPage(page);
    await failedLogin.gotoHomePage();
    await failedLogin.loginToWeb("SohrabShaikh", "SohhrabShhaikh");
    await page.waitForTimeout(3000);
    expect(alertAppeared).toBeTruthy();

});


test("Login Flow without Username", async ({ page }) => {
    let alertAppeared = false;

    page.on('dialog', async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    });

    const failedLogin = new LoginPage(page);

    await failedLogin.gotoHomePage();
    await failedLogin.loginButton.click();
    await failedLogin.loginPassword.fill("SohrabShaikh");
    await failedLogin.loginSubmitButton.click();
    await page.waitForTimeout(3000);

    expect(alertAppeared).toBeTruthy();
})


test("Login Flow without Password", async ({ page }) => {
    let alertAppeared = false;
    page.on('dialog', async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    })

    const failedLogin = new LoginPage(page);

    await failedLogin.gotoHomePage();
    await failedLogin.loginButton.click();
    await failedLogin.loginUserName.fill("SohrabShaikh")
    await failedLogin.loginSubmitButton.click();
    await page.waitForTimeout(3000);

    expect(alertAppeared).toBeTruthy();
})


test("Login Flow without Username and Password", async ({ page }) => {
    let alertAppeared = false;

    page.on('dialog', async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    });
    
    const failedLogin = new LoginPage(page);

    await failedLogin.gotoHomePage();
    await failedLogin.loginButton.click();
    await failedLogin.loginSubmitButton.click();

    expect(alertAppeared).toBeTruthy();
});


test("Verify Close button behaviour on Login popup window", async ({ page }) => {

    const closeLoginWindow = new LoginPage(page);

    await closeLoginWindow.gotoHomePage();
    await closeLoginWindow.closePopupLoginWindow();
    
});


test("Verify 'X' button behaviour on Login popup window", async ({ page }) => {
    
    const closeLoginWindow = new LoginPage(page);

    await closeLoginWindow.gotoHomePage();
    await closeLoginWindow.xPopupLoginWindow();
})


test("Verify if user try to enter only special cherecters and numbers in user name and password", async ({ page }) => {

    const initialUserName = ":>?<{}|!~@#$%^-=++_";
    const dateTime = Date.now();
    const mergeUserNameAndDateTime = `${initialUserName}${dateTime}`
  
    page.on("dialog", async (alertMessage) => {
      alertAppeared = true;
      expect(alertMessage.type()).toContain("alert");
      expect(alertMessage.message()).toContain("Sign up successful.");
      await alertMessage.dismiss();
  
    await page.goto("/");
    await page.click("//*[@id='signin2']");
  
    await page.fill("//input[@id='sign-username']", mergeUserNameAndDateTime);
    await page.fill("//input[@id='sign-password']", mergeUserNameAndDateTime);
  
    let alertAppeared = false;
  
    });
  
    await page.click("//button[@onclick='register()']");
  
    await page.waitForTimeout(3000);
    if (alertAppeared) {
      console.log("A new User was Registered with only Special Characters and Number, which is not valid");
    } else {
      console.log("Error occured as user tried to registered with only special characters in User Name field");
    }
  });