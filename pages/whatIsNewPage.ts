import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class WhatIsNewPage extends BasePage {
  private page: Page;
  readonly addToWishListLink: Locator;
  readonly endpoint: string;

  constructor(page: Page) {
    super();
    this.page = page;
    this.addToWishListLink = page.locator(
      ".product-item-info:hover a.towishlist"
    );
    this.endpoint = "/what-is-new.html";
  }

  async addItemToWhishListByName(name: string): Promise<void> {
    await this.page.locator(`.product-item-name a[title*='${name}']`).hover();
    await this.addToWishListLink.click();
  }

  async open(page: Page): Promise<void> {
    await super.open(page, this.endpoint);
  }
}
