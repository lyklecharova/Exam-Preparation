import { html } from "../../node_modules/lit-html/lit-html.js";
import { createFruit } from "../data/fruits.js";
import { createSubmitHandler } from "../util.js";

const createTemplate = (onCreate) => html`
  <section id="create">
    <div class="form">
      <h2>Add Fruit</h2>
      <form class="create-form" @submit=${onCreate}>
        <input type="text" name="name" id="name" placeholder="Fruit Name" />
        <input
          type="text"
          name="imageUrl"
          id="Fruit-image"
          placeholder="Fruit Image"
        />
        <textarea
          id="fruit-description"
          name="description"
          placeholder="Description"
          rows="10"
          cols="50"
        ></textarea>
        <textarea
          id="fruit-nutrition"
          name="nutrition"
          placeholder="Nutrition"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit">Add Fruit</button>
      </form>
    </div>
  </section>
`;

export function createPage(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)));

  async function onCreate({ name, imageUrl, description, nutrition }) {
    if ([name, imageUrl, description, nutrition].some((f) => f == "")) {
      return alert("All fields are required!");
    }
    await createFruit({
      name,
      imageUrl,
      description,
      nutrition,
    });
    ctx.page.redirect("/dashboard");
  }
}