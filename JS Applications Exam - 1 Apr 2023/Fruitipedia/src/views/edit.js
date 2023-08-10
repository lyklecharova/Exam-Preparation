import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, updateFruit } from "../data/fruits.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (fruit, onEdit) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit Fruit</h2>
      <form class="edit-form" @submit=${onEdit}>
        <input
          type="text"
          name="name"
          .value=${fruit.name}
          id="name"
          placeholder="Fruit Name"
        />
        <input
          type="text"
          name="imageUrl"
          .value=${fruit.imageUrl}
          id="Fruit-image"
          placeholder="Fruit Image URL"
        />
        <textarea
          id="fruit-description"
          name="description"
          .value=${fruit.description}
          placeholder="Description"
          rows="10"
          cols="50"
        ></textarea>
        <textarea
          id="fruit-nutrition"
          name="nutrition"
          .value=${fruit.nutrition}
          placeholder="Nutrition"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export async function editPage(ctx) {
  const id = ctx.params.id;
  const fruit = await getById(id);
  ctx.render(editTemplate(fruit, createSubmitHandler(onEdit)));

  async function onEdit({ name, imageUrl, description, nutrition }) {
    if ([name, imageUrl, description, nutrition].some((f) => f == "")) {
      return alert("All fields are required!");
    }
    await updateFruit(id, {
      name,
      imageUrl,
      description,
      nutrition,
    });
    ctx.page.redirect("/dashboard/" + id);
  }
}