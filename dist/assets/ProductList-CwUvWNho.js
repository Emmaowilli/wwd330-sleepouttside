import{r}from"./utils-BJU-VGx7.js";function s(t){const e=t.Discount?(t.FinalPrice*(1-t.Discount)).toFixed(2):t.FinalPrice.toFixed(2);return`
    <li class="product-card">
      <a href="/product_pages/index.html?product=${t.Id}">

        <img src="${t.Image||t.Images?.PrimaryMedium||"/images/default.jpg"}" alt="${t.Name}">
        <h3>${t.Brand?.Name||"Unknown Brand"}</h3>
        <p>${t.NameWithoutBrand||t.Name}</p>
        <p class="product-card__price">$${t.FinalPrice||t.ListPrice}</p>

        <img src="${t.Images?.PrimaryMedium||"/images/default.jpg"}" alt="Image of ${t.Name}" />
        <h3 class="card__brand">${t.Brand?.Name||"Unknown Brand"}</h3>
        <h2 class="card__name">${t.Name}</h2>
        <p class="product-card__price">₹${e}</p>
        <label>
          Quantity:
          <input type="number" min="1" value="1" data-id="${t.Id}" class="quantity-selector" />
        </label>
        <button class="add-to-cart" data-id="${t.Id}">Add to Cart</button>

      </a>
    </li>
  `}class l{constructor(e,a,i){this.category=e,this.dataSource=a,this.listElement=typeof i=="string"?document.querySelector(i):i}async init(){try{const e=await this.dataSource.getData(this.category);if(!e||e.length===0){this.listElement.innerHTML=`<p>No products found for category: ${this.category}</p>`;return}this.renderList(e);const a=document.querySelector(".title");a&&(a.textContent=this.category)}catch(e){console.error("Error initializing product list:",e),this.listElement.innerHTML="<p>Error loading products. Please try again later.</p>"}}renderList(e){r(s,this.listElement,e)}}export{l as P};
