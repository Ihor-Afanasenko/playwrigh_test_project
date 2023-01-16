import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  private page: Page;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly signInButton: Locator;
  readonly endpoint: string;

  constructor(page: Page) {
    super();
    this.page = page;
    this.emailField = page.locator("input#email");
    this.passwordField = page.locator("input#pass[name^='login']");
    this.signInButton = page.locator(".primary#send2");
    this.endpoint = "/customer/account/login";
  }

  async fillEmailField(email: string): Promise<void> {
    await this.emailField.type(email);
  }

  async fillPasswordField(password: string): Promise<void> {
    await this.passwordField.type(password);
  }

  async clickSignInButton(): Promise<void> {
    await this.signInButton.click();
  }

  async login(email: string, password: string): Promise<void> {
    await this.open(this.page);
    await this.fillEmailField(email);
    await this.fillPasswordField(password);
    await this.clickSignInButton();
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.endpoint);
  }
}
