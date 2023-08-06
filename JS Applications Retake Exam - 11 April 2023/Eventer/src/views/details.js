import { html } from "../../node_modules/lit-html/lit-html.js";
import {
    go,
    getEvents,
    getUserEvents,
} from "../data/going.js";
import { deleteEvent, getById } from "../data/events.js";
import { getUserData } from "../util.js";

const detailsTemplate = (event, onDelete, onEvent) => html`
     <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${event.imageUrl}" alt="example1" />
            <p id="details-title">${event.name}</p>
            <p id="details-category">
              Category: <span id="categories">${event.category}</span>
            </p>
            <p id="details-date">
              Date:<span id="date">${event.date}</span></p>
            <div id="info-wrapper">
              <div id="details-description">
                <span>${event.description}</span>
              </div>

            </div>

            <h3>Going: <span id="go">${event.going}</span> times.</h3>

            ${event.canEdit || event.canEvents

        ? html` <div id="action-buttons">
                 ${event.canEdit
                ? html`<a href="/catalog/${event._id}/edit" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
              `
                : null}
              ${event.canEvents
                ? html`
              <a @click=${onEvent} href="javascript:void(0)" id="go-btn">Going</a>
              `
                : null}
            </div>`
        : null}
          </div >
         
        </section >
    `;

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const requests = [getById(id), getEvents(id)];

    const userData = getUserData();

    if (userData) {
        requests.push(getUserEvents(id, userData._id));
    }

    const [event, going, hasEvents] = await Promise.all(requests);
    event.going = going;

    if (userData) {
        event.canEdit = userData._id == event._ownerId;
        event.canEvents = event.canEdit == false && hasEvents == 0;
    }
    update();

    function update() {
        ctx.render(detailsTemplate(event, onDelete, onEvent));
    }

    async function onDelete() {
        const choice = confirm("Are you sure?");

        if (choice) {
            await deleteEvent(id);
            ctx.page.redirect("/events");
        }
    }

    async function onEvent() {
        await go(id);
        event.going++;
        event.canEvents = false;
        update();
    }
}