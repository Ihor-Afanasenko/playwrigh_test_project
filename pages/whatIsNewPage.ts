import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class WhatIsNewPage extends BasePage {
  readonly addToWishListLink: Locator;
  readonly addPath: string = "/what-is-new.html";

  constructor(private page: Page) {
    super();
    this.addToWishListLink = page.locator(
      ".product-item-info:hover a.towishlist"
    );
  }

  async addItemToWhishListByName(name: string): Promise<void> {
    await this.page.locator(`.product-item-name a[title*='${name}']`).hover();
    await this.addToWishListLink.click();
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.addPath);
  }
}
