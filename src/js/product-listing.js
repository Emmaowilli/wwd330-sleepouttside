import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");

const dataSource = new ExternalServices(); 

const element = document.querySelector(".product-list");

if (category && element) {
  const listing = new ProductList(category, dataSource, element);
  listing.init();
} else {
  const productListContainer = document.querySelector(".product-list");
  if (productListContainer) {
    productListContainer.innerHTML = "<p>No category selected or product list missing.</p>";
  }
}
