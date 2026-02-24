import { test as baseTest } from './common-fixture'
import { UserPage } from '../pages/UserPage'
import process from 'process'

type HooksFixturesType = {
    gotoUrl: void;
    login: void;
    logout: void;
}

export const test = baseTest.extend<HooksFixturesType>({
    gotoUrl: async ({ loginPage }, use) => {
        await loginPage.gotoOrangeHRM();
        await use();
    },
    login: async ({ loginPage, commonUtils }, use) => {
        await loginPage.gotoOrangeHRM();
        const username = commonUtils.decryptData(process.env.USER_NAME!);
        const password = commonUtils.decryptData(process.env.PASSWORD!);
        await loginPage.loginOrangeHRM(username, password);
        await use();
    },
    logout: async ({ userpage }, use) => {
        await use();
        await userpage.logout();
    }
})

export { expect } from '@playwright/test'