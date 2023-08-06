import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllEvents } from "../data/events.js";

const catalogTemplate = (events) => html`
      <h2>Current Events</h2>
        <section id="dashboard">
        ${events.length > 0
        ? events.map(eventCard)
        : html`
            <h4>No Events yet.</h4>`}
        </section>
`;

const eventCard = (event) => html`
 <div class="event">
            <img src="${event.imageUrl}" alt="example1" />
            <p class="title">
              ${event.name}
            </p>
            <p class="date">${event.date}</p>
            <a class="details-btn" href="/catalog/${event._id}">Details</a>
          </div>
`;

export async function catalogPage(ctx) {
    const events = await getAllEvents();
    ctx.render(catalogTemplate(events));
}