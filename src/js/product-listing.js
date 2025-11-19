import ProductList from "./productList.mjs";        // capital L !
import { loadHeaderFooter } from "./utils.mjs";
import { getParam } from "./utils.mjs";              // note: getParam, not getParams

loadHeaderFooter();

const category = getParam("category");
const list = new ProductList(category, document.querySelector(".product-list"));
list.init();

// Live Search Functionality
document.getElementById("searchInput")?.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const products = document.querySelectorAll(".product-card");

  let found = false;
  products.forEach(card => {
    const name = card.querySelector("h2, h3, .product-name")?.textContent.toLowerCase() || "";
    const brand = card.querySelector(".product-brand")?.textContent.toLowerCase() || "";
    if (name.includes(searchTerm) || brand.includes(searchTerm)) {
      card.style.display = "";
      found = true;
    } else {
      card.style.display = "none";
    }
  });

  // Show/hide "No products found" message
  let noResults = document.getElementById("no-results");
  if (!found && searchTerm) {
    if (!noResults) {
      noResults = document.createElement("p");
      noResults.id = "no-results";
      noResults.textContent = "No products found.";
      noResults.style.textAlign = "center";
      noResults.style.padding = "2rem";
      document.querySelector(".product-list").appendChild(noResults);
    }
    noResults.style.display = "block";
  } else if (noResults) {
    noResults.style.display = "none";
  }
});