import mocks from "./mocks/mocks";

class CategoryDataService {
  constructor() {
  const {category} = mocks;
  this.category = category;
  }
  async getAll() {
    const json = this.category;
    return json;
  }
}

export default new CategoryDataService();
