export default class ProductList {
  constructor(category, dataSource, container) {
    this.category = category;
    this.dataSource = dataSource;
    this.container = typeof container === "string" ? document.querySelector(container) : container;
  }

  async init() {
  if (!this.container) return;

  try {
    const products = await this.dataSource.searchProducts(this.category);
    this.render(products);
  } catch (_) {
    this.container.innerHTML = "<p>Unable to load products.</p>";
  }
}


  render(products) {
    this.container.innerHTML = "";
    if (!products || products.length === 0) {
      this.container.innerHTML = "<p>No products found for this category.</p>";
      return;
    }

    products.forEach(product => {
      const li = document.createElement("li");
      li.className = "product-item";
      li.innerHTML = `
        <a href="/product_pages/index.html?id=${product.ID}">
          <img src="${product.PrimaryMedium || "/images/default.jpg"}" alt="${product.Name}">
          <h3>${product.Name}</h3>
          <p>₹${product.FinalPrice || product.ListPrice}</p>
        </a>
      `;
      this.container.appendChild(li);
    });
  }
}



