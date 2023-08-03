import { html } from "../../node_modules/lit-html/lit-html.js";
import {
    buy,
    getBought,
    getUserBought,
} from "../data/bought.js";
import { deleteProduct, getById } from "../data/products.js";
import { getUserData } from "../util.js";

const detailsTemplate = (product, onDelete, onBought) => html`
    <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${product.imageUrl}" alt="example1" />
            <p id="details-title">${product.name}</p>
            <p id="details-category">
              Category: <span id="categories">${product.category}</span>
            </p>
            <p id="details-price">
              Price: <span id="price-number">${product.price}</span>$</p>
            <div id="info-wrapper">
              <div id="details-description">
                <h4>Bought: <span id="buys">${product.bought}</span> times.</h4>
                <span>${product.description}</span>
              </div>
            </div>

            ${product.canEdit || product.canBought
        ? html` <div id="action-buttons">
                ${product.canEdit
                ? html` <a href="/catalog/${product._id}/edit" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
              `
                : null}
              ${product.canBought
                ? html`
              <a @click=${onBought} href="javascript:void(0)" id="buy-btn">Buy</a>
              `
                : null}
            </div>`
        : null}
          </div>
        </section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const requests = [getById(id), getBought(id)];

    const userData = getUserData();

    if (userData) {
        requests.push(getUserBought(id, userData._id));
    }

    const [product, bought, hasBought] = await Promise.all(requests);
    product.bought = bought;
    if (userData) {
        product.canEdit = userData._id == product._ownerId;
        product.canBought = product.canEdit == false && hasBought == 0;
    }
    update();
    function update() {
        ctx.render(detailsTemplate(product, onDelete, onBought));
    }

    async function onDelete() {
        const choice = confirm("Are you sure?");

        if (choice) {
            await deleteProduct(id);
            ctx.page.redirect("/catalog");
        }
    }

    async function onBought() {
      await buy(id);
      product.bought++;
      product.canBought = false;
      update();
    }
}