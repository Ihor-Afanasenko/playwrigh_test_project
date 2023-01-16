import { expect, test } from "../base/pomFixture";

test.describe("Home page", () => {
  test("User should see banners and contents", async ({ page, homePage }) => {
    await homePage.open(page);

    expect(await homePage.promoBannerVisible()).toBeTruthy;
    expect(await homePage.shirtBannerVisible()).toBeTruthy;
    expect(await homePage.pantsBannerVisible()).toBeTruthy;
    expect(await homePage.getEcoBannerTitle()).toBe(
      "Twice around, twice as nice"
    );
    expect(await homePage.getContentHeading()).toBe("Hot Sellers");
    expect(await homePage.contentProductItemVisible()).toBeTruthy;
  });
});
