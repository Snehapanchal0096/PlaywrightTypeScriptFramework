import process from 'process';
import {test} from "../fixtures/common-fixture";
import { expect } from "@playwright/test";

test('Global Setup for Auto Login', async ({page, loginPage, commonUtils, dashboardPage}) => {
    const  decryptUsername =commonUtils.decryptData(process.env.USER_NAME!); 
    const decryptPassword = commonUtils.decryptData(process.env.PASSWORD!);

    // Fail early with clear message if decryption produced empty values
    if (!decryptUsername || !decryptPassword) {
        throw new Error('Decrypted username or password is empty. Check SECRET_KEY and that .env values match the encryption key.');
    }

    await loginPage.gotoOrangeHRM();
    await loginPage.loginOrangeHRM(
        decryptUsername, decryptPassword
    );

    // Initialize dashboardPage here

    // loginOrangeHRM already waits for the dashboard URL; assert the URL and dashboard text
    await page.waitForURL(`${process.env.BASE_URL}/web/index.php/dashboard/index`);
    await expect(page).toHaveURL(`${process.env.BASE_URL}/web/index.php/dashboard/index`);
    await expect(dashboardPage.dashboardTitleText).toHaveText('Dashboard');
    await page.context().storageState(
        {path: './playwright/.auth/auth.json'});

    
        
});