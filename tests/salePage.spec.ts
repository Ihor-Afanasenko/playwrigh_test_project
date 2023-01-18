import { expect, test } from "../base/pomFixture";

test.describe("Sale page", () => {
  test("User should select item from the left menu, verify each items info, see 'Add to Cart'", async ({
    page,
    salePage,
  }) => {
    await salePage.open(page);
    await salePage.selectProductFromLeftMenu("Men", "Tees");

    expect(await salePage.getPageTitle(page)).toBe("Tees");
    expect(await salePage.allItemHas("image")).toBeTruthy;
    expect(await salePage.allItemHas("reviews")).toBeTruthy;
    expect(await salePage.allItemHas("price")).toBeTruthy;
    expect(await salePage.addToCartAppear()).toBeTruthy;
  });
});
