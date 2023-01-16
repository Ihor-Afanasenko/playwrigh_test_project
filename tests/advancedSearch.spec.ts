import { expect, test } from "../base/pomFixture";

test.describe("Advanced search", () => {
  test("User should submit the form with any random data, verify there is a page with no results found ", async ({
    advancedSearchPage,
    product,
    page,
  }) => {
    await advancedSearchPage.open(page);

    expect(await advancedSearchPage.getPageTitle(page)).toBe("Advanced Search");

    await advancedSearchPage.fillSearchForm(
      product.productName,
      product.sku,
      product.description,
      product.shortDescription,
      product.priceFrom,
      product.priceTo
    );
    await advancedSearchPage.confirmSearch();

    expect(await advancedSearchPage.getPageTitle(page)).toBe(
      "Catalog Advanced Search"
    );
    expect(await advancedSearchPage.getMessageError()).toContain(
      "We can't find any items matching these search criteria"
    );
  });
});
