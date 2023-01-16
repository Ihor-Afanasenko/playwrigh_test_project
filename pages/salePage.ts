import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SalePage extends BasePage {
  private page: Page;
  readonly itemImage: string;
  readonly itemPrice: string;
  readonly itemReviews: string;
  readonly toCartButton: string;
  readonly amountItems: Locator;
  readonly productInfo: Locator;
  readonly endpoint: string;

  constructor(page: Page) {
    super();
    this.page = page;
    this.itemImage = ".product-image-photo";
    this.itemPrice = "[id^='product-price']";
    this.itemReviews = ".rating-result";
    this.toCartButton = ".action.tocart";
    this.amountItems = page.locator("#toolbar-amount>.toolbar-number");
    this.productInfo = page.locator(".product>.product-item-info");
    this.endpoint = "/sale.html";
  }

  async selectProductFromLeftMenu(
    categoryName: string,
    productName: string
  ): Promise<void> {
    await this.page
      .locator(
        `ul.items li.item a[href*='${productName.toLowerCase()}-${categoryName.toLowerCase()}']`
      )
      .click();
  }

  async allItemHas(element: string): Promise<boolean> {
    let webElement: string;
    switch (element) {
      case "image":
        webElement = this.itemImage;
        break;
      case "price":
        webElement = this.itemPrice;
        break;
      case "reviews":
        webElement = this.itemReviews;
        break;
      default:
        throw Error("Invalid element");
    }
    const getAmountItems = Number(await this.amountItems.first().innerText());
    return await this.page
      .locator(webElement)
      .evaluateAll(
        (element, amount) => element.length === amount,
        getAmountItems
      );
  }

  async addToCartAppear(): Promise<boolean> {
    const states = [] as boolean[];
    for (const product of await this.productInfo.all()) {
      await product.hover();
      states.push(await product.locator(this.toCartButton).isVisible());
    }
    return states.every((element) => element === true);
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.endpoint);
  }
}
