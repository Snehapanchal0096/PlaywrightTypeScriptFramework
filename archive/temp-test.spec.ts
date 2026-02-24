import process from "process";
import { test, expect } from '../fixtures/hooks-fixture';

test.use({ storageState: { cookies: [], origins: [] } });

// test.beforeEach('Before Each Hook', async ({ loginPage }) => {
//     await loginPage.gotoOrangeHRM();
// })

// test.afterEach('After Each Test', async ({ userpage }) => {
//     await userpage.logout();
// })

test("Temp test", async ({ page, gotoUrl }) => {
    //  console.log(process.env.BASE_URL);
    //  console.log(process.env.USERNAME);
    //  console.log(process.env.PASSWORD);
    //  await loginPage.gotoOrangeHRM();
    //  await loginPage.loginOrangeHRM("Admin", "admin123");

    // const commonUtilsObj = new CommonUtil();
    //commonUtils.encryptData("Admin");

    // await loginPage.gotoOrangeHRM();
    // const decryptedUsername = commonUtils.decryptData(process.env.USER_NAME!);
    // const decryptedPassword = commonUtils.decryptData(process.env.PASSWORD!);
    // await loginPage.loginOrangeHRM(decryptedUsername, decryptedPassword);
    console.log(await page.title());
    // await loginPage.loginOrangeHRM(decryptedUsername, decryptedPassword);
    // await new Promise(resolve => setTimeout(resolve, 120000)); // 120000 ms = 2 minutes

})

test("Temp test 2", async ({ page, gotoUrl }) => {
    //await loginPage.gotoOrangeHRM();
    await expect(page).toHaveTitle("OrangeHRM");

})

test("Temp test 3", async ({ page, login, logout }) => {
    await expect(page).toHaveTitle("OrangeHRM");

})