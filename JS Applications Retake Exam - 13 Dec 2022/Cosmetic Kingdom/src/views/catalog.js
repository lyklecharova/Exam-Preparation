import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllProducts } from "../data/products.js";

const catalogTemplate = (products) => html`
   <h2>Products</h2>
        <section id="dashboard">
        ${products.length > 0
        ? products.map(productCard)

        : html` <h2>No products yet.</h2>`}
        </section>
        
        
`;

const productCard = (product) => html`
  <div class="product">
            <img src="${product.imageUrl}" alt="example1" />
            <p class="title">${product.name}</p>
            <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
            <a class="details-btn" href="/catalog/${product._id}">Details</a>
          </div>
`;

export async function catalogPage(ctx) {
    const products = await getAllProducts();
    ctx.render(catalogTemplate(products));
}