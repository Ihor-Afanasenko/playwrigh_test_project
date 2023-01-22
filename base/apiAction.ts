import { request, expect } from "@playwright/test";
import { User } from "./userData";

export class APIAction {
  readonly baseURL: string;
  readonly pathToCreate: string;
  readonly endpointToLogin: string;

  constructor() {
    this.baseURL = "https://magento.softwaretestingboard.com";
    this.pathToCreate = "/customer/account/create";
  }

  getFormKey(response: string): string {
    return response
      .split('form_key" type="hidden" value="')[1]
      .split('" /><div id="authentication')[0];
  }

  async createTestUserViaAPI(user: User): Promise<void> {
    const req = await request.newContext();
    const getReg = await req.get(`${this.baseURL}${this.pathToCreate}`);
    const formKey = this.getFormKey((await getReg.body()).toString());
    const post_res = await req.post(`${this.baseURL}${this.pathToCreate}post`, {
      form: {
        form_key: formKey,
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        password: user.password,
        password_confirmation: user.password,
      },
    });
    expect(post_res.ok()).toBeTruthy();
  }
}
