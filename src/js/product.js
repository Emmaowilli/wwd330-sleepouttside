const params = new URLSearchParams(window.location.search);
const categoryParam = params.get("category");

const searchMap = {
  "tents": "tents",
  "backpacks": "backpacks",
  "sleepingbags": "sleepingbags",
  "hammocks": "hammocks"
};

const searchTerm = searchMap[categoryParam] || "tents";

async function loadProducts() {
  try {
    const response = await fetch(`/products/search/${searchTerm}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
    document.getElementById("product-list").innerHTML = `<li>Error loading products.</li>`;
  }
}

function renderProducts(products) {
  const container = document.getElementById("product-list");
  container.innerHTML = products.map(item => `
    <li class="product-card">
      <a href="product.html?id=${item.Id}">
        <img src="${item.Image || item.Images?.PrimaryLarge}" alt="${item.Name}" />
        <h3>${item.Name}</h3>
        <p>$${item.FinalPrice || item.Price}</p>
      </a>
    </li>
  `).join('');
}

loadProducts();

0