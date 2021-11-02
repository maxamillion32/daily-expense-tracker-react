import {accounts} from "./mocks/mocks";

class AccountDataService {
  constructor() {
  this.accounts = accounts;
  }
  async getAll() {
    const json = this.accounts;
    return json;
  }
}

export default new AccountDataService();
