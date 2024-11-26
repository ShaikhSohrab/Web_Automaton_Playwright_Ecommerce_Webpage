const { test, expect } = require("@playwright/test");
const RegisterPage = require('../pages/register_page');

// This is to prevent using LoginAuth of GlobalSetup
test.use({ storageState: "./NoAuth.json" });

test("Verify New User Registeration Flow", async ({ page }) => {

    const registerPage = new RegisterPage(page);
    // Defile User Name and join Username with Date and Time to have unique Username everytime
    const initialUserName = "SohrabShaikh";
    const dateTimeUser = Date.now();
    const incrementedUserName = `${initialUserName}${dateTimeUser}`;
    let alertAppeared = false;

    // Goto webpage
    await registerPage.gotoHomePage();

    page.on("dialog", async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert");
        expect(alertMessage.message()).toContain("Sign up successful.");
        await alertMessage.accept();
    });

    
    await registerPage.registerOnWeb(incrementedUserName, "SohrabShaikh");

    await page.waitForTimeout(5000);

    if (alertAppeared) {
        console.log(`A new user was registered successfully with username: ${incrementedUserName}`);
    } else {
        console.log(`Error occurred during registration for username: ${incrementedUserName}`);
    }

    expect(alertAppeared).toBeTruthy();
});

test("Verify if already registerd user is able to register again", async ({ page }) => {
    let alertAppeared = false;

    page.on("dialog", async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert");
        expect(alertMessage.message()).toContain("This user already exist.");
        await alertMessage.accept();
    });

    const signupExistingUser = new RegisterPage(page);

    await signupExistingUser.gotoHomePage();
    await signupExistingUser.registerOnWeb("SohrabShaikh", "SohrabShaikh");
    await page.waitForTimeout(2000);

    expect(alertAppeared).toBeTruthy();
});


test("Verify if user is able to register with only Username filled", async ({ page }) => {
    let alertAppeared = false;
    page.on("dialog", async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    });

    const failSignup = new RegisterPage(page);

    await failSignup.gotoHomePage();
    await failSignup.signUpButton.click();
    await failSignup.signUpUserName.fill("RegisterUser1");
    await failSignup.signUpSubmitButton.click();
    expect(alertAppeared).toBeTruthy();
});


test("Verify if user is able to register with only password filled", async ({ page }) => {
    let alertAppeared = false;

    page.on('dialog', async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    });

    const failSignup = new RegisterPage(page);

    await failSignup.gotoHomePage();
    await failSignup.signUpButton.click();
    await failSignup.signUpPassword.fill("RegisterUserPass1");
    await failSignup.signUpSubmitButton.click();

    expect(alertAppeared).toBeTruthy();
});


test("Verify if user is able to register without username and password", async ({ page }) => {
    let alertAppeared = false;

    page.on("dialog", async (alertMessage) => {
        alertAppeared = true;
        expect(alertMessage.type()).toContain("alert")
        expect(alertMessage.message()).toContain("Please fill out Username and Password.")
        await alertMessage.dismiss();
    })

    const failSignup = new RegisterPage(page);

    await failSignup.gotoHomePage();
    await failSignup.signUpButton.click();
    await failSignup.signUpSubmitButton.click();

    expect(alertAppeared).toBeTruthy();
});


test("Verify if user is able to click on close button from Register popup Window", async ({ page }) => {

const closeSignUpWindow = new RegisterPage(page);

await closeSignUpWindow.gotoHomePage();
await closeSignUpWindow.closePopupSignUpWindow();

})


test("Verify if user is able to click on 'X' button from Register popup Window", async ({ page }) => {

    const closeSignUpWindow = new RegisterPage(page);

    await closeSignUpWindow.gotoHomePage();
    await closeSignUpWindow.xPopupSignupWindow();
});


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
