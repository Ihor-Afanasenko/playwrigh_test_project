import { request, expect } from "@playwright/test";
import { User } from "./userData";

export class APIAction {
  readonly baseURL: string;
  readonly endpointToCreate: string;
  readonly endpointToLogin: string;

  constructor() {
    this.baseURL = "https://magento.softwaretestingboard.com";
    this.endpointToCreate = "/customer/account/create";
    this.endpointToLogin = "/customer/account/login";
  }

  getFormKey(response: string): string {
    return response
      .split('form_key" type="hidden" value="')[1]
      .split('" /><div id="authentication')[0];
  }

  async createTestUserViaAPI(user: User): Promise<void> {
    const req = await request.newContext();
    const getReg = await req.get(`${this.baseURL}${this.endpointToCreate}`);
    const formKey = this.getFormKey((await getReg.body()).toString());
    const post_res = await req.post(
      `${this.baseURL}${this.endpointToCreate}post`,
      {
        form: {
          form_key: formKey,
          firstname: user.firstName,
          lastname: user.lastName,
          email: user.email,
          password: user.password,
          password_confirmation: user.password,
        },
      }
    );
    expect(post_res.ok()).toBeTruthy();
  }

  async loginTestUserViaAPI(user: User): Promise<void> {
    const req = await request.newContext();
    const getReg = await req.get(`${this.baseURL}${this.endpointToLogin}`);
    const formKey = this.getFormKey((await getReg.body()).toString());
    const post_res = await req.post(
      `${this.baseURL}${this.endpointToLogin}Post`,
      {
        form: {
          form_key: formKey,
          "login[username]": user.email,
          "login[password]": user.password,
        },
      }
    );
    console.log(post_res.ok());
    expect(post_res.ok()).toBeTruthy();
  }
}
