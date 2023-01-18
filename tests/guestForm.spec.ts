import { expect, test } from "../base/pomFixture";

test.describe("Guest page", () => {
  test("Guest should submit the form with a non-existing order id and the rest valid data verify the form is not submitted", async ({
    user,
    page,
    geustFormPage,
  }) => {
    await geustFormPage.open(page);

    expect(await geustFormPage.getPageTitle(page)).toBe("Orders and Returns");
    await geustFormPage.fillOrderInformation(
      user.orderId,
      user.lastName,
      "Email",
      user.email
    );
    await geustFormPage.confirmOrder();

    expect(await geustFormPage.getMessage(page)).toBe(
      "You entered incorrect data. Please try again."
    );
  });
});
