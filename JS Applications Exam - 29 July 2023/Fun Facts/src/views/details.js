import { html } from "../../node_modules/lit-html/lit-html.js";
import {
    liked,
    getLikes,
    getUserLikes,
} from "../data/likes.js";
import { deleteFact, getById } from "../data/facts.js";
import { getUserData } from "../util.js";

const detailsTemplate = (f, onDelete, onFact) => html`
         <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${f.imageUrl}" alt="example1" />
            <p id="details-category">${f.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">
                  ${f.description}
                  </p>
                   <p id ="more-info">${f.moreInfo}</p>
              </div>

              <h3>Likes:<span id="likes">${f.like}</span></h3>

              ${f.canEdit || f.canLikes
               ? html`
          <div id="action-buttons">
          ${f.canEdit
            ? html`<a href="/catalog/${f._id}/edit" id="edit-btn">Edit</a>
            <a  @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            `
            : null}
            ${f.canLikes
            ? html`
             <!--Bonus - Only for logged-in users ( not authors )-->
            <a @click=${onFact} href="javascript:void(0)" id="like-btn">Like</a>
            `
            : null}
          </div>`
             : null}
            </div>
        </div>
      </section>
    `;

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const requests = [getById(id), getLikes(id)];

    const userData = getUserData();

    if (userData) {
        requests.push(getUserLikes(id, userData._id));
    }

    const [fact, like, hasLikes] = await Promise.all(requests);
    fact.like = like;

    if (userData) {
        fact.canEdit = userData._id == fact._ownerId;
        fact.canLikes = fact.canEdit == false && hasLikes == 0;
    }
    update();

    function update() {
        ctx.render(detailsTemplate(fact, onDelete, onFact));
    }

    async function onDelete() {
        const choice = confirm("Are you sure?");

        if (choice) {
            await deleteFact(id);
            ctx.page.redirect("/catalog");
        }
    }

    async function onFact() {
        await liked(id);
        fact.likes++;
        fact.canLikes = false;
        update();
    }
}