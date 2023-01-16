import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class BagsPage extends BasePage {
  private page: Page;
  readonly currentSorterState: Locator;
  readonly finalPriceItem: Locator;
  readonly itemtName: Locator;
  readonly productItem: Locator;
  readonly hoverProduct: string;
  readonly frameStyle: string;
  readonly endpoint: string;

  constructor(page: Page) {
    super();
    this.page = page;
    this.currentSorterState = page.locator("#sorter>[selected='selected']");
    this.finalPriceItem = page.locator("[data-price-type='finalPrice']");
    this.itemtName = page.locator(".name>.product-item-link");
    this.productItem = page.locator(".list .product-item");
    this.hoverProduct = ".product-item-info:hover";
    this.frameStyle = "1px solid rgb(187, 187, 187)";
    this.endpoint = "/gear/bags.html";
  }

  async seeFrameAfterHoverOverItem(): Promise<boolean> {
    const states = [] as string[];
    for (const product of await this.productItem.all()) {
      await product.hover();
      states.push(
        await this.page.$eval(
          this.hoverProduct,
          (el) => window.getComputedStyle(el).border
        )
      );
    }
    return states.every((element) => element === this.frameStyle);
  }

  async sortProductsBy(type: string): Promise<void> {
    await this.page.getByLabel("Sort By").selectOption(type);
  }

  async itemsSortedByPositionAsDefault(): Promise<boolean> {
    return (await this.currentSorterState.first().innerText()) === "Position";
  }

  compareTwoArrays(
    firstArray: Array<number | string>,
    secondArray: Array<number | string>
  ): boolean {
    return (
      firstArray.length === secondArray.length &&
      firstArray.every((element, index) => element === secondArray[index])
    );
  }

  async itemsSortedByPrice(): Promise<boolean> {
    const priceItems = [] as number[];
    for (const price of await this.finalPriceItem.all()) {
      priceItems.push(Number(await price.getAttribute("data-price-amount")));
    }
    return this.compareTwoArrays(priceItems, priceItems.sort());
  }

  async itemsSortedByProductName(): Promise<boolean> {
    const productName = [] as string[];
    for (const name of await this.itemtName.all()) {
      productName.push(await name.innerText());
    }
    return this.compareTwoArrays(productName, productName.sort());
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.endpoint);
  }
}
