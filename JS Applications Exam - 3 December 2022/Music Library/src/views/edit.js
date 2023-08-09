import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, updateAlbum } from "../data/albums.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (a, onEdit) => html`
        <section id="edit">
        <div class="form">
          <h2>Edit Album</h2>
          <form class="edit-form" @submit=${onEdit}>
            <input type="text" 
            name="singer" 
            .value=${a.singer}
            id="album-singer" 
            placeholder="Singer/Band" />

            <input type="text" 
            name="album" 
            id="album-album"
            .value=${a.album}
             placeholder="Album" />

            <input type="text" 
            name="imageUrl" 
            .value=${a.imageUrl}
            id="album-img" 
            placeholder="Image url" />

            <input type="text" 
            name="release" 
            .value=${a.release}
            id="album-release" 
            placeholder="Release date" />

            <input type="text"
             name="label" 
             .value=${a.label}
             id="album-label" 
             placeholder="Label" />

            <input type="text" 
            name="sales" 
            .value=${a.sales}
            id="album-sales" 
            placeholder="Sales" />

            <button type="submit">post</button>
          </form>
        </div>
      </section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const fruit = await getById(id);
    ctx.render(editTemplate(fruit, createSubmitHandler(onEdit)));

    async function onEdit({ singer,
        album,
        imageUrl,
        release,
        label,
        sales }) {
        if ([singer,
            album,
            imageUrl,
            release,
            label,
            sales].some((f) => f == "")) {
            return alert("All fields are required!");
        }
        await updateAlbum(id, {
            singer,
            album,
            imageUrl,
            release,
            label,
            sales
        });
        ctx.page.redirect("/dashboard/" + id);
    }
}