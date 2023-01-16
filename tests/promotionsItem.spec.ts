import { expect, test } from "../base/pomFixture";

test.describe("Promotions item", () => {
  test("User should add item to preview and cart", async ({
    pantsAllPage,
    previewItemPage,
    cartPage,
    page,
  }) => {
    await pantsAllPage.open(page);

    expect(await pantsAllPage.getPageTitle(page)).toBe("Pants");
    await pantsAllPage.selectItemByName("Portia Capri");

    expect(await previewItemPage.getPageTitle(page)).toBe("Portia Capri");
    expect(await previewItemPage.previewPhotoVisible()).toBeTruthy;
    await previewItemPage.switchToTab("More information");

    expect(previewItemPage.productAttributeVisible).toBeTruthy;
    await previewItemPage.switchToTab("Reviews");

    expect(previewItemPage.yourRaitingVisible).toBeTruthy;
    await previewItemPage.selectSizeColorAndAddToCart("28", "Green");

    expect(await previewItemPage.getMessage(page)).toBe(
      "You added Portia Capri to your shopping cart."
    );
    await cartPage.open(page);

    expect(await cartPage.getPageTitle(page)).toBe("Shopping Cart");
    expect(await cartPage.getProductProperty()).toContain("28");
    expect(await cartPage.getProductProperty()).toContain("Green");
  });
});
