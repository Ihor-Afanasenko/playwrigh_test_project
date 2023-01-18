import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class AdvancedSearchPage extends BasePage {
  private page: Page;
  readonly productNameField: Locator;
  readonly skuFiled: Locator;
  readonly descriptionField: Locator;
  readonly shortDescriptionField: Locator;
  readonly priceFromField: Locator;
  readonly priceToField: Locator;
  readonly searchFormButton: Locator;
  readonly messageError: Locator;
  readonly endpoint: string;

  constructor(page: Page) {
    super();
    this.page = page;
    this.productNameField = page.locator("input#name");
    this.skuFiled = page.locator("input#sku");
    this.descriptionField = page.locator("input#description");
    this.shortDescriptionField = page.locator("input#short_description");
    this.priceFromField = page.locator("input#price");
    this.priceToField = page.locator("input#price_to");
    this.searchFormButton = page.locator(".primary>button.search");
    this.messageError = page.locator(".message.error");
    this.endpoint = "/catalogsearch/advanced";
  }

  async fillSearchForm(
    productName: string,
    sku: string,
    description: string,
    shortDescription: string,
    priceFrom: string,
    priceTo: string
  ): Promise<void> {
    await this.fillField(this.productNameField, productName);
    await this.fillField(this.skuFiled, sku);
    await this.fillField(this.descriptionField, description);
    await this.fillField(this.shortDescriptionField, shortDescription);
    await this.fillField(this.priceFromField, priceFrom);
    await this.fillField(this.priceToField, priceTo);
  }

  async confirmSearch(): Promise<void> {
    await this.searchFormButton.click();
  }

  async getMessageError(): Promise<string> {
    return await this.messageError.innerText();
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.endpoint);
  }
}
