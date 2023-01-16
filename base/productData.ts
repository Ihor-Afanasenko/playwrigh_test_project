import { faker } from "@faker-js/faker";

export class Product {
  productName: string;
  sku: string;
  description: string;
  shortDescription: string;
  priceFrom: string;
  priceTo: string;

  constructor() {
    this.productName = faker.commerce.productName();
    this.sku = faker.random.numeric(12);
    this.description = faker.commerce.productDescription();
    this.shortDescription = faker.finance.transactionDescription();
    this.priceFrom = faker.random.numeric(2);
    this.priceTo = faker.random.numeric(4);
  }
}
