import { Locator, Page } from "@playwright/test";
import process from "process";

export class LoginPage {
    readonly page: Page;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly dashboardHeader: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userNameInput = page.getByRole("textbox", { name: "Username" });
        this.passwordInput = page.getByRole("textbox", { name: "Password" });
        this.loginButton = page.getByRole("button", { name: "Login" });
        this.dashboardHeader = page.getByRole("heading", { name: "Dashboard" });
        this.errorMessage = page.getByText("Invalid credentials");
    }

    /**
     * To open URL in tor Browser and navigate to OrangeHRM login page
     * */
    async gotoOrangeHRM() {
        await this.page.goto(`${process.env.BASE_URL}/web/index.php/auth/login`);
    }

    /**     * To perform login action on OrangeHRM login page
     * @param username - The username to be entered in the login form
     * @param password - The password to be entered in the login form
     * */
    async loginOrangeHRM(username: string, password: string) {
        await this.userNameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Verify that login was successful by checking for dashboard element
     * @returns true if login was successful, false otherwise
     * */
    async verifyLoginSuccess(): Promise<boolean> {
        return await this.dashboardHeader.isVisible();
    }
}