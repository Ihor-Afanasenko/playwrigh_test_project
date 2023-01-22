import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  private page: Page;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly signInButton: Locator;
  readonly addPath: string;

  constructor(page: Page) {
    super();
    this.page = page;
    this.emailField = page.locator("input#email");
    this.passwordField = page.locator("input#pass[name^='login']");
    this.signInButton = page.locator(".primary#send2");
    this.addPath = "/customer/account/login";
  }

  async clickSignInButton(): Promise<void> {
    await this.signInButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.open(this.page);
    await this.typeField(this.emailField, email);
    await this.typeField(this.passwordField, password);
    await this.clickSignInButton();
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.addPath);
  }
}
