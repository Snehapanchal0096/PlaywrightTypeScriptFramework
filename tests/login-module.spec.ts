import { test, expect } from '../fixtures/hooks-fixture'
import loginModuleData from '../data/login-module-data.json'

test.use({
    storageState: {
        cookies: [],
        origins: []
    }
})

test('[Login] Verify that the user cannot log in with an invalid password',
    {
        tag: ['@UI', '@UAT'],
        annotation: {
            type: 'Test Case Link',
            description: 'Test case 1 link here .'
        }
    },
    async ({ gotoUrl, loginPage, commonUtils }) => {
        const username = commonUtils.decryptData(process.env.USER_NAME!);
        const password = commonUtils.decryptData(process.env.PASSWORD!);
        await loginPage.loginOrangeHRM(username, loginModuleData.wrong_password);
        await expect(loginPage.errorMessage).toHaveText(loginModuleData.invalid_credentials_text);
        await expect(loginPage.userNameInput).toBeVisible();
    })

test('[Login] Verify that the user cannot log in with an invalid username',
    {
        tag: ['@UI', '@UAT'],
        annotation: {
            type: 'Test Case Link',
            description: 'Test case 2 link here .'
        }
    }, async ({ gotoUrl, loginPage, commonUtils }) => {
        const password = commonUtils.decryptData(process.env.PASSWORD!);
        await loginPage.loginOrangeHRM(loginModuleData.invalid_username, password);
        await expect(loginPage.errorMessage).toHaveText(loginModuleData.invalid_credentials_text);
        await expect(loginPage.userNameInput).toBeVisible();
    })

test('[Login] Verify that the user cannot log in with both an invalid username and password',
    {
        tag: ['@UI', '@UAT', '@DEV'],
        annotation: {
            type: 'Test Case Link',
            description: 'Test case 3 link here .'
        }
    }, async ({ gotoUrl, loginPage, commonUtils }) => {
        await loginPage.loginOrangeHRM(loginModuleData.invalid_username, loginModuleData.wrong_password);
        await expect(loginPage.errorMessage).toHaveText(loginModuleData.invalid_credentials_text);
        await expect(loginPage.userNameInput).toBeVisible();
    })

