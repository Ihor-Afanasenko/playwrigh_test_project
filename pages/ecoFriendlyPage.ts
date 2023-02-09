import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class EcoFriendlyPage extends BasePage {
  readonly searchField: Locator;
  readonly searchResulttPageTitle: Locator;
  readonly productItem: Locator;
  readonly sortByMenu: Locator;
  readonly addPath: string = "/collections/eco-friendly.html";

  constructor(private page: Page) {
    super();
    this.searchField = page.locator("#search");
    this.searchResulttPageTitle = page.locator(".base", {
      hasText: "Search results for: ",
    });
    this.productItem = page.locator(".product-item");
    this.sortByMenu = page.locator("#sorter");
  }

  async searchProduct(productName: string): Promise<void> {
    await this.fillField(this.searchField, productName);
    await this.page.keyboard.press("Enter");
    await this.searchResulttPageTitle.waitFor({ state: "visible" });
  }

  async sortProductsBy(type: string): Promise<void> {
    do {
      await this.sortByMenu.first().selectOption({ label: type });
    } while (!this.page.url().includes("?q=tank&product_list_order"));
  }

  async selectFirstProduct(): Promise<void> {
    await this.productItem.first().click();
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.addPath);
  }
}
