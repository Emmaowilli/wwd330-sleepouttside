// success.js
import { getLocalStorage } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const orderMessage = document.getElementById("order-message");

  // Get order number from localStorage
  const orderNumber = getLocalStorage("orderNumber");

  if (orderNumber) {
    orderMessage.textContent = `Your order #${orderNumber} has been successfully placed!`;
  } else {
    orderMessage.textContent = "Your order has been placed successfully!";
  }

  // Clear cart after successful checkout
  localStorage.removeItem("so-cart");
  localStorage.removeItem("orderNumber");
});
