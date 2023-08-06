import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, updateEvent } from "../data/events.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (event, onEdit) => html`
 <section id="edit">
          <div class="form">
            <h2>Edit Event</h2>
            <form class="edit-form"  @submit=${onEdit}>
              <input
                type="text"
                name="name"
                .value=${event.name}
                id="name"
                placeholder="Event"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${event.imageUrl}
                id="event-image"
                placeholder="Event Image"
              />
              <input
                type="text"
                name="category"
                .value=${event.category}
                id="event-category"
                placeholder="Category"
              />


              <textarea
                id="event-description"
                name="description"
                .value=${event.description}
                placeholder="Description"
                rows="5"
                cols="50"
              ></textarea>
              
              <label for="date-and-time">Event Time:</label>
              <input
              type="text"
              name="date"
              .value=${event.date}
              id="date"
              placeholder="When?"
            />

              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const offer = await getById(id);
    ctx.render(editTemplate(offer, createSubmitHandler(onEdit)));

    async function onEdit({
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
        await updateEvent(id, {
            name,
            imageUrl,
            category,
            description,
            date,
        });
        ctx.page.redirect("/catalog/" + id);
    }
}