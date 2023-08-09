import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllAlbums } from "../data/albums.js";

const dashboardTemplate = (albums) => html`
         <section id="dashboard">
        <h2>Albums</h2>
        <ul class="card-wrapper">
          <!-- Display a li with information about every post (if any)-->
          ${albums.length > 0
        ? albums.map(albumCard)
        : html`
           <h2>There are no albums added yet.</h2>`}
        </ul>
      </section>
`;

const albumCard = (a) => html` 
            <li class="card">
            <img src="${a.imageUrl}" alt="travis" />
            <p>
              <strong>Singer/Band: </strong><span class="singer">${a.singer}</span>
            </p>
            <p>
              <strong>Album name: </strong><span class="album">${a.album}</span>
            </p>
            <p><strong>Sales:</strong><span class="sales">${a.sales}</span></p>
            <a class="details-btn" href="/dashboard/${a._id}">Details</a>
          </li>
`;

export async function dashboardPage(ctx) {
    const albums = await getAllAlbums();
    ctx.render(dashboardTemplate(albums));
}