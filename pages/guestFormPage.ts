import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class GuestFormPage extends BasePage {
  private page: Page;
  readonly orderIdField: Locator;
  readonly billingLastNameField: Locator;
  readonly emailField: Locator;
  readonly endpoint: string;

  constructor(page: Page) {
    super();
    this.page = page;
    this.orderIdField = page.locator("input#oar-order-id");
    this.billingLastNameField = page.locator("input#oar-billing-lastname");
    this.emailField = page.locator("input#oar_email");
    this.endpoint = "/sales/guest/form";
  }

  async fillOrderIdField(orderId: string): Promise<void> {
    await this.orderIdField.fill(orderId);
  }

  async fillBillingLastNameField(bullingLastName: string): Promise<void> {
    await this.billingLastNameField.type(bullingLastName);
  }

  async selectFindOrderBy(findOrderBy: string): Promise<void> {
    await this.page.getByLabel("Find Order By").selectOption(findOrderBy);
  }

  async fillEmailField(email: string): Promise<void> {
    await this.emailField.fill(email);
  }

  async fillOrderInformation(
    orderId: string,
    bullingLastName: string,
    findOrderBy: string,
    email: string
  ): Promise<void> {
    await this.fillOrderIdField(orderId);
    await this.fillBillingLastNameField(bullingLastName);
    await this.selectFindOrderBy(findOrderBy);
    await this.fillEmailField(email);
  }

  async confirmOrder() {
    await this.page.getByTitle("Continue").click();
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.endpoint);
  }
}
