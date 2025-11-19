const baseURL = import.meta.env.VITE_SERVER_URL || '';

function convertToJson(res) {
  if (res.ok) return res.json();
  throw new Error('Bad Response');
}

export default class ExternalServices {
  constructor(mockMode = false) {
    this.mockMode = mockMode;
  }

  async getData(category) {
    if (this.mockMode) {
      const response = await fetch(`/json/${category}.json`);
      const data = await convertToJson(response);
      return data;
    } else {
      const response = await fetch(`${baseURL}products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result;
    }
  }

  async searchProducts(term) {
    if (this.mockMode) {
      const categories = ['tents', 'sleeping-bags', 'backpacks', 'hammocks'];
      let all = [];
      for (const category of categories) {
        try {
          const items = await this.getData(category);
          if (Array.isArray(items)) all = all.concat(items);
        } catch (err) {
          console.warn(`Could not load ${category}.json`, err);
        }
      }
      const lowered = term.toLowerCase();
      return all.filter(p => (p.Name || '').toLowerCase().includes(lowered) || (p.NameWithoutBrand || '').toLowerCase().includes(lowered));
    } else {
      const response = await fetch(`${baseURL}products/search/${encodeURIComponent(term)}`);
      const data = await convertToJson(response);
      return data.Result;
    }
  }

  async findProductById(id) {
    if (this.mockMode) {
      const categories = ['tents', 'sleeping-bags', 'backpacks', 'hammocks'];
      for (const category of categories) {
        try {
          const products = await this.getData(category);
          const product = products.find(p => String(p.Id) === String(id));
          if (product) return product;
        } catch (_) { /* ignore */ }
      }
      return null;
    } else {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
    }
  }

  async checkout(payload) {
    const options = { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}

