export class SingletonPage {
  private static _instance: SingletonPage;

  public static getInstance(): SingletonPage {
    if (!SingletonPage._instance) {
      SingletonPage._instance = new SingletonPage();
    }

    return SingletonPage._instance;
  }
}
