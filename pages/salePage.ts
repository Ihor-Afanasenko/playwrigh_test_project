import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class SalePage extends BasePage {
  readonly itemImage: string = ".product-image-photo";
  readonly itemPrice: string = "[id^='product-price']";
  readonly itemReviews: string = ".rating-result";
  readonly toCartButton: string = ".action.tocart";
  readonly amountItems: Locator;
  readonly productInfo: Locator;
  readonly addPath: string = "/sale.html";

  constructor(private page: Page) {
    super();
    this.amountItems = page.locator("#toolbar-amount>.toolbar-number");
    this.productInfo = page.locator(".product>.product-item-info");
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
    await super.open(page, this.addPath);
  }
}
