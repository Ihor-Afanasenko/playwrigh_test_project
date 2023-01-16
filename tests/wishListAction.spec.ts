import { expect, test } from "../base/pomFixture";

test.describe("Whish list", () => {
  test("User should add item to whish list, preview, add to cart", async ({
    user,
    apiAction,
    page,
    homePage,
    loginPage,
    accountPage,
    whatIsNewPage,
    whishListPage,
    previewItemPage,
  }) => {
    await apiAction.createTestUserViaAPI(user);

    await homePage.open(page);
    await loginPage.login(user.email, user.password);

    expect(await accountPage.getPageTitle(page)).toBe("My Account");
    await whatIsNewPage.open(page);

    expect(await whatIsNewPage.getPageTitle(page)).toBe("What's New");
    await whatIsNewPage.addItemToWhishListByName("Phoebe Zipper Sweatshirt");

    expect(await whishListPage.itemWithNameVisible("Phoebe Zipper Sweatshirt"))
      .toBeTruthy;
    expect(await whishListPage.getPageTitle(page)).toBe("My Wish List");
    expect(await whishListPage.getMessage(page)).toContain(
      "Phoebe Zipper Sweatshirt has been added to your Wish List."
    );
    await whishListPage.openItemInPreview("Phoebe Zipper Sweatshirt");

    expect(await previewItemPage.previewPhotoVisible()).toBeTruthy;
    await previewItemPage.selectSizeColorAndAddToCart("XS", "Gray");

    expect(await previewItemPage.getMessage(page)).toBe(
      "You added Phoebe Zipper Sweatshirt to your shopping cart."
    );
  });
});
