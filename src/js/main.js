import ProductList from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { CheckoutProcess } from "./CheckoutProcess.mjs";

// Load header and footer
loadHeaderFooter();

// Get URL parameters
const productId = getParam("id");
const category = getParam("category");

// Initialize data source
const dataSource = new ExternalServices("", true);

document.addEventListener("DOMContentLoaded", () => {
  const listElement = document.querySelector(".product-list");
  const productSection = document.querySelector(".products");
  const detailSection = document.getElementById("product-detail");
  const backBtn = document.getElementById("back-to-list");
  const toggleBtn = document.getElementById("theme-toggle");

  // Initialize ProductList for listing page
  const productList = listElement ? new ProductList(category, dataSource, listElement) : null;

  // Initialize checkout process
  const checkout = new CheckoutProcess("so-cart", "#cart-summary");
  checkout.init();

  // Place order button
  document.querySelector("#place-order-btn")?.addEventListener("click", () => {
    checkout.checkout();
  });

  // Back button
  backBtn?.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  // Theme toggle
  toggleBtn?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggleBtn.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });

  // Display either product listing or product detail
  if (productId && detailSection) {
    // Hide listing, show detail
    productSection?.style.setProperty("display", "none");
    detailSection.style.setProperty("display", "block");

    // Load product detail
    dataSource.findProductById(productId)
      .then(product => {
        if (!product) {
          detailSection.innerHTML = "<p>Product not found.</p>";
          return;
        }

        document.getElementById("detail-name").textContent = product.Name;
        const imageEl = document.getElementById("detail-image");
        if (imageEl) {
          imageEl.src = product.PrimaryMedium || "/images/default.jpg";
          imageEl.alt = product.Name;
        }

        document.getElementById("detail-brand").textContent = `Brand: ${product.Brand?.Name || "Unknown"}`;
        document.getElementById("detail-price").textContent = `Price: ₹${product.FinalPrice || product.ListPrice}`;
        document.getElementById("detail-category").textContent = `Category: ${product.Category || "N/A"}`;
      })
      .catch(() => {
  detailSection.innerHTML = "<p>Error loading product details.</p>";
});

  } else {
    // Show listing, hide detail
    productSection?.style.setProperty("display", "block");
    detailSection?.style.setProperty("display", "none");

    if (productList) {
      productList.init();
    }
  }
});

