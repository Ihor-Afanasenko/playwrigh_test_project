import { faker } from "@faker-js/faker";

export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  newPassword: string;
  orderId: string;

  constructor() {
    this.firstName = faker.name.firstName();
    this.lastName = faker.name.lastName();
    this.email = `acc.pw.testing+${faker.random
      .numeric(10)
      .toString()}@gmail.com`;
    this.password = faker.internet.password();
    this.newPassword = faker.internet.password();
    this.orderId = faker.random.numeric(20);
  }
}
