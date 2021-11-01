import mocks from "./mocks/mocks";

class TransactionDataService {
  constructor() {
  const {transactions} = mocks;
  this.transactions = transactions;
  }
  async getAll() {
    const json = this.transactions;
    return json;
  }
}

export default new TransactionDataService();
