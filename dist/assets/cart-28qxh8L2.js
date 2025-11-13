import{l as p,s,a as l}from"./utils-BJU-VGx7.js";/* empty css              */p();const f=new URLSearchParams(window.location.search);f.get("cleared")==="true"&&(localStorage.removeItem("so-cart"),s("so-cart",[]));function i(){const t=l("so-cart")||[],e=document.querySelector(".product-list"),o=document.querySelector(".list-footer"),a=document.getElementById("cart-count"),n=document.querySelector(".list-total");if(t.length===0){e.innerHTML="<p>Your cart is empty.</p>",o?.classList.add("hide"),a&&(a.textContent="0"),n&&(n.textContent="Total: ₹0.00");return}const d=t.map(C);e.innerHTML=d.join(""),g(),t.reduce((c,r)=>c+r.FinalPrice*(r.quantity||1),0);const u=t.reduce((c,r)=>c+r.FinalPrice*(r.quantity||1),0);if(n&&(n.textContent=`Total: ₹${u.toFixed(2)}`),o?.classList.remove("hide"),a){const c=t.reduce((r,m)=>r+(m.quantity||1),0);a.textContent=c.toString()}}function g(){document.querySelectorAll(".remove-item-btn").forEach(e=>{e.addEventListener("click",o=>{o.preventDefault();const a=e.dataset.productId;y(a)})})}function y(t){let e=l("so-cart")||[];e=e.filter(o=>o.Id!==t),s("so-cart",e),i()}function C(t){const e=t.quantity||1,o=(t.FinalPrice*e).toFixed(2);return`<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${t.Image}" alt="${t.Name}">
    </a>
    <a href="#">
      <h2 class="card__name">${t.Name}</h2>
    </a>
    <p class="cart-card__color">${t.Colors&&t.Colors.length>0?t.Colors[0].ColorName:"Color not specified"}</p>
    <p class="cart-card__quantity">qty: ${e}</p>
    <p class="cart-card__price">₹${o}</p>
    <button class="remove-item-btn" data-product-id="${t.Id}" title="Remove item from cart">✕</button>
  </li>`}i();
