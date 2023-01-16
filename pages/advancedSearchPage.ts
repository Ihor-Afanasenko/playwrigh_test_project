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

  async fillProductNameFiled(productName: string): Promise<void> {
    await this.productNameField.fill(productName);
  }

  async filSkuFiled(sku: string): Promise<void> {
    await this.skuFiled.fill(sku);
  }

  async filDescriptionFiled(description: string): Promise<void> {
    await this.descriptionField.fill(description);
  }

  async fillShotDescriptionField(shortDescription: string): Promise<void> {
    await this.shortDescriptionField.fill(shortDescription);
  }

  async fillPriceFromField(priceFrom: string): Promise<void> {
    await this.priceFromField.fill(priceFrom);
  }

  async fillPriceToField(priceTo: string): Promise<void> {
    await this.priceToField.fill(priceTo);
  }

  async fillSearchForm(
    productName: string,
    sku: string,
    description: string,
    shortDescription: string,
    priceFrom: string,
    priceTo: string
  ): Promise<void> {
    await this.fillProductNameFiled(productName);
    await this.filSkuFiled(sku);
    await this.filDescriptionFiled(description);
    await this.fillShotDescriptionField(shortDescription);
    await this.fillPriceFromField(priceFrom);
    await this.fillPriceToField(priceTo);
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
