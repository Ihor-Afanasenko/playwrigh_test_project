import { test as base } from "@playwright/test";
import { BasePage } from "../pages/basePage";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { AccountPage } from "../pages/accountPage";
import { WhatIsNewPage } from "../pages/whatIsNewPage";
import { WishListPage } from "../pages/wishListPage";
import { PreviewItemPage } from "../pages/previewItemPage";
import { PantsAllPage } from "../pages/pantsAllPage";
import { CartPage } from "../pages/cartPage";
import { EcoFriendlyPage } from "../pages/ecoFriendlyPage";
import { SalePage } from "../pages/salePage";
import { BagsPage } from "../pages/bagPage";
import { GuestFormPage } from "../pages/guestFormPage";
import { AdvancedSearchPage } from "../pages/advancedSearchPage";
import { User } from "./userData";
import { Product } from "./productData";
import { APIAction } from "./apiAction";

type pages = {
  basePage: BasePage;
  homePage: HomePage;
  loginPage: LoginPage;
  accountPage: AccountPage;
  whatIsNewPage: WhatIsNewPage;
  whishListPage: WishListPage;
  previewItemPage: PreviewItemPage;
  pantsAllPage: PantsAllPage;
  cartPage: CartPage;
  ecoFriendlyPage: EcoFriendlyPage;
  salePage: SalePage;
  bagsPage: BagsPage;
  geustFormPage: GuestFormPage;
  advancedSearchPage: AdvancedSearchPage;
  user: User;
  product: Product;
  apiAction: APIAction;
};

export const test = base.extend<pages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page));
  },
  whatIsNewPage: async ({ page }, use) => {
    await use(new WhatIsNewPage(page));
  },
  whishListPage: async ({ page }, use) => {
    await use(new WishListPage(page));
  },
  previewItemPage: async ({ page }, use) => {
    await use(new PreviewItemPage(page));
  },
  pantsAllPage: async ({ page }, use) => {
    await use(new PantsAllPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  ecoFriendlyPage: async ({ page }, use) => {
    await use(new EcoFriendlyPage(page));
  },
  salePage: async ({ page }, use) => {
    await use(new SalePage(page));
  },
  bagsPage: async ({ page }, use) => {
    await use(new BagsPage(page));
  },
  geustFormPage: async ({ page }, use) => {
    await use(new GuestFormPage(page));
  },
  advancedSearchPage: async ({ page }, use) => {
    await use(new AdvancedSearchPage(page));
  },
  // eslint-disable-next-line no-empty-pattern
  user: async ({}, use) => {
    await use(new User());
  },
  // eslint-disable-next-line no-empty-pattern
  product: async ({}, use) => {
    await use(new Product());
  },
  // eslint-disable-next-line no-empty-pattern
  apiAction: async ({}, use) => {
    await use(new APIAction());
  },
});

export { expect } from "@playwright/test";
