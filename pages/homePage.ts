import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  private page: Page;
  readonly promoBanner: Locator;
  readonly tShirtsBanner: Locator;
  readonly pantsBanner: Locator;
  readonly ecoBanner: Locator;
  readonly contentHeading: Locator;
  readonly productItem: Locator;

  constructor(page: Page) {
    super();
    this.page = page;
    this.promoBanner = page.locator(".block-promo.home-main");
    this.tShirtsBanner = page.locator(".home-t-shirts");
    this.pantsBanner = page.locator(".home-pants");
    this.ecoBanner = page.locator(".home-eco .title");
    this.contentHeading = page.locator(".content-heading h2");
    this.productItem = page.locator(".product-items");
  }

  async promoBannerVisible(): Promise<boolean> {
    return await this.promoBanner.isVisible();
  }

  async shirtBannerVisible(): Promise<boolean> {
    return await this.tShirtsBanner.isVisible();
  }

  async pantsBannerVisible(): Promise<boolean> {
    return await this.pantsBanner.isVisible();
  }

  async getEcoBannerTitle(): Promise<string> {
    return await this.ecoBanner.innerText();
  }

  async getContentHeading(): Promise<string> {
    return await this.contentHeading.innerText();
  }

  async contentProductItemVisible(): Promise<boolean> {
    return await this.productItem.isVisible();
  }

  async open(page: Page): Promise<void> {
    await super.open(page, "");
  }
}
