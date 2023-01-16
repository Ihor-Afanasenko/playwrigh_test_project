import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class AccountPage extends BasePage {
  private page: Page;
  readonly dropdown: Locator;
  readonly switchButton: Locator;
  readonly openDropdown: Locator;
  readonly changePasswordLink: Locator;
  readonly currentPassword: Locator;
  readonly newPasswordField: Locator;
  readonly passwordMeter: Locator;
  readonly passwordConfirmation: Locator;
  readonly saveButton: Locator;
  readonly endpoint: string;

  constructor(page: Page) {
    super();
    this.page = page;
    this.dropdown = page.locator(".panel .logged-in");
    this.switchButton = page.locator(".panel .customer-welcome .switch");
    this.openDropdown = page.locator(".active ul.header.links");
    this.changePasswordLink = page.locator("a.change-password");
    this.currentPassword = page.locator("#current-password");
    this.newPasswordField = page.locator("#password");
    this.passwordMeter = page.locator("#password-strength-meter");
    this.passwordConfirmation = page.locator("#password-confirmation");
    this.saveButton = page.locator(".save");
    this.endpoint = "/customer/account/index";
  }

  async openCustomerDropdown(): Promise<void> {
    await this.dropdown.waitFor({ state: "visible" });
    await this.switchButton.click();
  }

  async clickOnSignOutLink(): Promise<void> {
    await this.openDropdown.waitFor({ state: "visible" });
    await this.openDropdown
      .locator("li")
      .filter({ hasText: "Sign Out" })
      .click();
  }

  async signOut(): Promise<void> {
    await this.openCustomerDropdown();
    await this.clickOnSignOutLink();
  }

  async clickOnChangePasswordLink(): Promise<void> {
    await this.changePasswordLink.click();
  }

  async fillCurrentPasswordField(currentPassword: string): Promise<void> {
    await this.currentPassword.fill(currentPassword);
  }

  async fillNewPasswordField(newPassword: string) {
    await this.newPasswordField.fill(newPassword);
    await this.passwordMeter.waitFor({ state: "visible" });
  }

  async fillConfirmationNewPasswordField(newPassword: string) {
    await this.passwordConfirmation.type(newPassword);
  }

  async clickSaveButton() {
    await this.passwordMeter.waitFor({ state: "visible" });
    await this.saveButton.click();
  }

  async changePassword(
    newPassword: string,
    currentPassword: string
  ): Promise<void> {
    await this.clickOnChangePasswordLink();
    await this.fillCurrentPasswordField(currentPassword);
    await this.fillNewPasswordField(newPassword);
    await this.fillConfirmationNewPasswordField(newPassword);
    await this.clickSaveButton();
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.endpoint);
  }
}
