import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteFruit, getById } from "../data/fruits.js";
import { getUserData } from "../util.js";

const detailsTemplate = (fruit, onDelete) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="${fruit.imageUrl}" alt="example1" />
      <p id="details-title">${fruit.name}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p>${fruit.description}</p>
          <p id="nutrition">Nutrition</p>
          <p id="details-nutrition">${fruit.nutrition}</p>
        </div>
        ${fruit.canEdit
          ? html` <div id="action-buttons">
              <a href="/dashboard/${fruit._id}/edit" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn"
                >Delete</a
              >
            </div>`
          : null}
      </div>
    </div>
  </section>
`;

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const fruit = await getById(id);
  const userData = getUserData();

  if (userData && userData._id == fruit._ownerId) {
    fruit.canEdit = true;
  }
  ctx.render(detailsTemplate(fruit, onDelete));

  async function onDelete() {
    const choice = confirm("Are you sure?");

    if (choice) {
      await deleteFruit(id);
      ctx.page.redirect("/dashboard");
    }
  }
}