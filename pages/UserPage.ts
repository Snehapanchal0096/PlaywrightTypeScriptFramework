import { Locator, Page } from "@playwright/test";

export class UserPage {
    readonly page: Page;
    readonly userManuButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userManuButton = page.locator(".oxd-userdropdown-tab");
        this.logoutButton = page.getByRole('menuitem', { name: 'Logout' });
    }

    async logout() {
        await this.userManuButton.click();
        await this.logoutButton.click();
    }
}