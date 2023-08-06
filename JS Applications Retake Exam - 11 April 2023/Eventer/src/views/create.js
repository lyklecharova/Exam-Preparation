import { html } from "../../node_modules/lit-html/lit-html.js";
import { createEvent } from "../data/events.js";
import { createSubmitHandler } from "../util.js";

const createTemplate = (onCreate) => html`
    <section id="create">
          <div class="form">
            <h2>Add Event</h2>
            <form class="create-form"  @submit=${onCreate}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                id="event-image"
                placeholder="Event Image URL"
              />
              <input
                type="text"
                name="category"
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <input
              type="text"
              name="date"
              id="date"
              placeholder="When?"
            />

              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`;

export function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(onCreate)));

    async function onCreate({
        name,
        imageUrl,
        category,
        description,
        date,
    }) {
        if (
            [name,
                imageUrl,
                category,
                description,
                date].some(
                    (f) => f == ""
                )
        ) {
            return alert("All fields are required!");
        }
        await createEvent({
            name,
            imageUrl,
            category,
            description,
            date,
        });
        ctx.page.redirect("/catalog");
    }
}