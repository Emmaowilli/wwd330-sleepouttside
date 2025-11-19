import{r}from"./utils-BJU-VGx7.js";function n(t){const e=t.Discount?(t.FinalPrice*(1-t.Discount)).toFixed(2):t.FinalPrice.toFixed(2);return`
    <li class="product-card">
      <a href="/product_pages/index.html?product=${t.Id}">
        <img src="${t.Images?.PrimaryMedium||"/images/default.jpg"}" alt="${t.Name}">
        <h3>${t.Brand?.Name||"Unknown Brand"}</h3>
        <p>${t.NameWithoutBrand||t.Name}</p>
        <p class="product-card__price">₹${e}</p>
      </a>

      <label>
        Quantity:
        <input type="number" min="1" value="1" data-id="${t.Id}" class="quantity-selector" />
      </label>
      <button class="add-to-cart" data-id="${t.Id}">Add to Cart</button>
    </li>
  `}class o{constructor(e,i,a){this.category=e,this.dataSource=i,this.listElement=typeof a=="string"?document.querySelector(a):a}async init(){try{const e=await this.dataSource.getData(this.category);if(!e||e.length===0){this.listElement.innerHTML=`<p>No products found for category: ${this.category}</p>`;return}this.renderList(e);const i=document.querySelector(".title");i&&(i.textContent=this.category)}catch(e){console.error("Error initializing product list:",e),this.listElement.innerHTML="<p>Error loading products. Please try again later.</p>"}}renderList(e){r(this.listElement,e,n)}}export{o as P};
