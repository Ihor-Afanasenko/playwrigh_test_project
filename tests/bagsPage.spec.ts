import { expect, test } from "../base/pomFixture";

test.describe("Bags page", () => {
  test("User should see frame on hover over to item, sort by position/product name/price, sorted accordingly", async ({
    user,
    apiAction,
    bagsPage,
    loginPage,
    page,
  }) => {
    await apiAction.createTestUserViaAPI(user);

    await loginPage.login(user.email, user.password);
    await bagsPage.open(page);

    expect(await bagsPage.seeFrameAfterHoverOverItem()).toBeTruthy;
    expect(await bagsPage.itemsSortedByPositionAsDefault()).toBeTruthy;
    await bagsPage.sortProductsBy("Price");

    expect(await bagsPage.itemsSortedByPrice()).toBeTruthy;
    await bagsPage.sortProductsBy("Product Name");

    expect(await bagsPage.itemsSortedByProductName()).toBeTruthy;
  });
});
