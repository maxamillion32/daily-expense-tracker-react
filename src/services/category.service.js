import {categories} from "./mocks/mocks";

class CategoryDataService {
  constructor() {
  this.categories = categories;
  }
  async getAll() {
    const json = this.categories;
    return json;
  }
}

export default new CategoryDataService();
