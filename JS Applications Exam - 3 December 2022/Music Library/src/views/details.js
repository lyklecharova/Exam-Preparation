import { html } from "../../node_modules/lit-html/lit-html.js";
import {
    like,
    getLikes,
    getUserLikes,
} from "../data/likes.js";
import { deleteAlbum, getById } from "../data/albums.js";
import { getUserData } from "../util.js";

const detailsTemplate = (a, onDelete, onLike) => html`
        <section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src="${a.imageUrl}" alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${a.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${a.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${a.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${a.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${a.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">${a.countLikes}</span></div>

          ${a.canEdit || a.canLikes
        ? html` <div id="action-buttons">
            ${a.canEdit
                ? html`<a href="/dashboard/${a._id}/edit" id="edit-btn">Edit</a>
             <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
             `
                : null}
              ${a.canLikes
                ? html`
            <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>
            `
                : null}
          </div>`
        : null}
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

    const [a, l, hasLikes] = await Promise.all(requests);
    a.l = l;

    if (userData) {
        a.canEdit = userData._id == a._ownerId;
        a.canLikes = a.canEdit == false && hasLikes == 0;
    }
    update();

    function update() {
        ctx.render(detailsTemplate(a, onDelete, onLike));
    }

    async function onDelete() {
        const choice = confirm("Are you sure?");

        if (choice) {
            await deleteAlbum(id);
            ctx.page.redirect("/dashboard");
        }
    }

    async function onLike() {
        await like(id);
        a.l++;
        a.canLikes = false;
        update();
    }
}