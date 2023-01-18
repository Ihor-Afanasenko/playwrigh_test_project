import { expect, test } from "../base/pomFixture";

test.describe("Eco friendly collections", () => {
  test("User should search, add the most expensive product and verify result in cart", async ({
    apiAction,
    user,
    page,
    loginPage,
    ecoFriendlyPage,
    cartPage,
    previewItemPage,
  }) => {
    await apiAction.createTestUserViaAPI(user);

    await loginPage.login(user.email, user.password);
    await ecoFriendlyPage.open(page);
    await ecoFriendlyPage.searchProduct("tank");
    await ecoFriendlyPage.sortProductsBy("Price");
    await ecoFriendlyPage.selectFirstProduct();
    await previewItemPage.selectSizeColorAndAddToCart("XL", "Green");
    await cartPage.open(page);

    expect(await cartPage.getPageTitle(page)).toBe("Shopping Cart");
    expect(await cartPage.getProductProperty()).toContain("XL");
    expect(await cartPage.getProductProperty()).toContain("Green");
  });
});
