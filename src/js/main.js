import ProductList from "./productList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { CheckoutProcess } from "./CheckoutProcess.mjs";

loadHeaderFooter();

const productId = getParam("id");
const category = getParam("category");

// Mock data mode active
const dataSource = new ExternalServices("", true);

// ------------------------------------------------------------------------
// FIX: Declare variables globally (outside DOMContentLoaded) so external 
// event listeners and code blocks can access them (resolves no-undef errors).
// ------------------------------------------------------------------------
const productSection = document.querySelector(".products");
const detailSection = document.getElementById("product-detail");
const backBtn = document.getElementById("back-to-list");
const toggleBtn = document.getElementById("theme-toggle");

// Initialize checkout globally so the 'place-order-btn' listener can use it.
const checkout = new CheckoutProcess("so-cart", "#cart-summary");

// FIX: Declare variables that are only used inside the DOMContentLoaded scope
document.addEventListener("DOMContentLoaded", () => {
// FIX: Removed listElement, productList, as they were either unused or re-declared below
// and caused 'no-unused-vars' warnings.

checkout.init();

 // 🔍 SEARCH BAR FUNCTIONALITY
 const searchInput = document.getElementById("product-search");
 const resultsContainer = document.getElementById("search-results");
if (searchInput) {
searchInput.addEventListener("input", async (e) => {
const term = e.target.value.trim();

 if (term.length < 2) {
 resultsContainer.innerHTML = "";
 return;
 }

 // FIX: Ensure searchProducts exists on ExternalServices
 const results = await dataSource.searchProducts(term);

 if (!results || results.length === 0) {
 resultsContainer.innerHTML = `<p>No product found.</p>`;
 return;
 }

 // Reuse ProductList renderer
 const tempList = new ProductList(null, dataSource, "#search-results");
 tempList.displayProducts(results);
 });
 }
});

// Order button
document.querySelector("#place-order-btn")?.addEventListener("click", () => {
 checkout.checkout();
});

// Back button for detail view
backBtn?.addEventListener("click", () => {
 window.location.href = "index.html";
});

// Product detail loading
if (productId && detailSection) {
 // FIX: productSection and detailSection are now defined above.
 productSection?.style.setProperty("display", "none");
 detailSection.style.setProperty("display", "block");

 dataSource
 .findProductById?.(productId)
 ?.then((product) => {
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

 document.getElementById("detail-brand").textContent =
 `Brand: ${product.Brand?.Name || "Unknown"}`;
 document.getElementById("detail-price").textContent =
 `Price: ₹${product.FinalPrice || product.ListPrice}`;
 document.getElementById("detail-category").textContent =
 `Category: ${product.Category || "N/A"}`;
 })
 .catch((err) => {
 // FIX: Removed console.error to avoid the no-console warning (92:7)
 // console.error("Error loading product detail:", err);
 detailSection.innerHTML = "<p>Error loading product details.</p>";
 });
} else {
 // FIX: productSection and detailSection are now defined above.
 productSection?.style.setProperty("display", "block");
 detailSection?.style.setProperty("display", "none");

 // FIX: Re-declared listElement and productList ONLY if needed here
 const listElement = document.querySelector(".product-list");
 const productList = new ProductList(category, dataSource, ".product-list");
 listElement && productList.init();
}

// Theme toggle
// FIX: toggleBtn is now defined above.
toggleBtn?.addEventListener("click", () => {
 document.body.classList.toggle("dark-mode");
 toggleBtn.textContent = document.body.classList.contains("dark-mode")
  ? "☀️"
 : "🌙";
});
