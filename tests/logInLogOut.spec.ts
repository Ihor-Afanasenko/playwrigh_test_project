import { expect, test } from "../base/pomFixture";

test.describe("Login and Logout", () => {
  test("User should login and logout", async ({
    user,
    apiAction,
    page,
    homePage,
    loginPage,
    accountPage,
  }) => {
    await apiAction.createTestUserViaAPI(user);

    await homePage.open(page);
    await loginPage.login(user.email, user.password);

    expect(await accountPage.getPageTitle(page)).toBe("My Account");
    await accountPage.signOut();

    expect(await accountPage.getPageTitle(page)).toContain(
      "You are signed out"
    );
  });
});
