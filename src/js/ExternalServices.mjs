export default class ExternalServices {
  constructor(baseUrl = "/src/json", useMock = true) {
    this.baseUrl = baseUrl;
    this.useMock = useMock;
  }

  async searchProducts(category) {
    if (this.useMock) {
      const res = await fetch(`${this.baseUrl}/tents.json`); // for now, use tents.json for all
      const data = await res.json();
      return data.filter(p => p.Category.toLowerCase() === category.toLowerCase());
    }
    // Later, API call can replace mock
  }

  async findProductById(id) {
    if (this.useMock) {
      const res = await fetch(`${this.baseUrl}/tents.json`);
      const data = await res.json();
      return data.find(p => p.ID === id);
    }
  }
}

