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

  async selectFindOrderBy(findOrderBy: string): Promise<void> {
    await this.page.getByLabel("Find Order By").selectOption(findOrderBy);
  }

  async fillOrderInformation(
    orderId: string,
    bullingLastName: string,
    findOrderBy: string,
    email: string
  ): Promise<void> {
    await this.fillField(this.orderIdField, orderId);
    await this.typeField(this.billingLastNameField, bullingLastName);
    await this.selectFindOrderBy(findOrderBy);
    await this.fillField(this.emailField, email);
  }

  async confirmOrder() {
    await this.page.getByTitle("Continue").click();
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.endpoint);
  }
}
