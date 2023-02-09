import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class GuestFormPage extends BasePage {
  readonly orderIdField: Locator;
  readonly billingLastNameField: Locator;
  readonly emailField: Locator;
  readonly addPath: string = "/sales/guest/form";

  constructor(private page: Page) {
    super();
    this.orderIdField = page.locator("input#oar-order-id");
    this.billingLastNameField = page.locator("input#oar-billing-lastname");
    this.emailField = page.locator("input#oar_email");
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
    await super.open(page, this.addPath);
  }
}
