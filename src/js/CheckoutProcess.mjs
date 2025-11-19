import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export class CheckoutProcess {
  constructor(cartKey, summarySelector) {
    this.cartKey = cartKey;
    this.summaryElement = document.querySelector(summarySelector);
    this.cartItems = [];
  }

  init() {
    this.cartItems = getLocalStorage(this.cartKey) || [];
    this.displayCartSummary();
  }

  displayCartSummary() {
    if (!this.summaryElement) return;

    this.summaryElement.innerHTML = "";

    if (this.cartItems.length === 0) {
      this.summaryElement.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    let total = 0;

    this.cartItems.forEach((item) => {
      const itemTotal = item.FinalPrice * item.Quantity;
      total += itemTotal;

      const itemEl = document.createElement("div");
      itemEl.classList.add("cart-item");
      itemEl.innerHTML = `
        <p>${item.Name} × ${item.Quantity}</p>
        <p>₹${itemTotal}</p>
      `;
      this.summaryElement.appendChild(itemEl);
    });

    const totalEl = document.createElement("div");
    totalEl.classList.add("cart-total");
    totalEl.innerHTML = `<strong>Total: ₹${total}</strong>`;
    this.summaryElement.appendChild(totalEl);
  }

  // checkout function accepts a callback for messaging
  checkout(showAlert) {
    if (this.cartItems.length === 0) {
      showAlert("Your cart is empty.");
      return;
    }

    try {
      // Simulate order submission
      console.log("Placing order:", this.cartItems);

      // Save order for success page
      setLocalStorage("placed-order", this.cartItems);

      // Clear cart
      setLocalStorage(this.cartKey, []);
      this.cartItems = [];
      this.displayCartSummary();

      showAlert("Order placed successfully!", "success");

      // Delay redirect for message to show
      setTimeout(() => {
        window.location.href = "/checkout/success.html";
      }, 1000);
    } catch (error) {
      showAlert("Something went wrong while placing your order.");
      console.error(error);
    }
  }
}
