import mocks from "./mocks/mocks";

class AccountDataService {
  constructor() {
  const {account} = mocks;
  this.account = account;
  }
  async getAll() {
    const json = this.account;
    return json;
  }
}

export default new AccountDataService();
