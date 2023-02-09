import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class PreviewItemPage extends BasePage {
  readonly previewPhoto: Locator;
  readonly addToCartButton: Locator;
  readonly moreInfoTab: Locator;
  readonly reviewsTab: Locator;
  readonly productAttribute: Locator;
  readonly yourRaitingFields: Locator;

  constructor(private page: Page) {
    super();
    this.previewPhoto = page.locator(".fotorama-item");
    this.addToCartButton = page.locator("#product-addtocart-button");
    this.moreInfoTab = page.locator("[id*='additional-title']");
    this.reviewsTab = page.locator("[id*='reviews-title']");
    this.productAttribute = page.locator(".item#additional");
    this.yourRaitingFields = page.locator(".review-field-ratings");
  }

  async previewPhotoVisible(): Promise<boolean> {
    return this.previewPhoto.isVisible();
  }

  async selectSizeItem(size: string): Promise<void> {
    await this.page.locator(`[id*='size'][option-label='${size}']`).click();
  }

  async selectItemColor(color: string): Promise<void> {
    await this.page.locator(`[id*='color'][option-label='${color}']`).click();
  }

  async addItemToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async switchToTab(tabName: string): Promise<void> {
    await (tabName === "Review" ? this.reviewsTab : this.moreInfoTab).click();
  }

  async productAttributeVisible(): Promise<boolean> {
    return await this.productAttribute.isVisible();
  }

  async yourRaitingVisible(): Promise<boolean> {
    return await this.yourRaitingFields.isVisible();
  }

  async selectSizeColorAndAddToCart(
    size: string,
    color: string
  ): Promise<void> {
    await this.selectSizeItem(size);
    await this.selectItemColor(color);
    await this.addItemToCart();
    await this.page
      .locator(this.message, { hasText: "You added " })
      .waitFor({ state: "visible" });
  }
}
