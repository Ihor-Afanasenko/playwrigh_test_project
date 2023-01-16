import { expect, test } from "../base/pomFixture";

test.describe("Reset password", () => {
  test("User should reset password, log in with new password, try to Log in with old password", async ({
    apiAction,
    user,
    page,
    homePage,
    loginPage,
    accountPage,
  }) => {
    await apiAction.createTestUserViaAPI(user);

    await homePage.open(page);
    await loginPage.login(user.email, user.password);

    expect(await accountPage.getPageTitle(page)).toBe("My Account");
    await accountPage.changePassword(user.newPassword, user.password);

    expect(await loginPage.getPageTitle(page)).toBe("Customer Login");
    expect(await loginPage.getMessage(page)).toBe(
      "You saved the account information."
    );
    await loginPage.login(user.email, user.newPassword);

    expect(await accountPage.getPageTitle(page)).toBe("My Account");
    await accountPage.signOut();
    await loginPage.open(page);
    await loginPage.login(user.email, user.password);

    expect(await loginPage.getMessage(page)).toBe(
      "The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later."
    );
  });
});
