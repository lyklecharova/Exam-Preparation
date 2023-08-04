import { html } from "../../node_modules/lit-html/lit-html.js";
import { getComments, makeComment } from "../data/comments.js";
import { deleteGame, getById } from "../data/games.js";
import { createSubmitHandler, getUserData } from "../util.js";

const detailsTemplate = (game, onDelete, comments, userData, onSubmit) => html`
  <section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
      <div class="game-header">
        <img class="game-img" src="${game.imageUrl}" />
        <h1>${game.title}</h1>
        <span class="levels">MaxLevel: ${game.maxLevel}</span>
        <p class="type">${game.category}</p>
      </div>

      <p class="text">${game.summary}</p>

      <div class="details-comments">
        <h2>Comments:</h2>
        ${comments.length > 0
          ? html`
              <ul>
                ${comments.map(
                  (comment) => html`
                    <li class="comment">
                      <p>Content: ${comment.comment}</p>
                    </li>
                  `
                )}
              </ul>
            `
          : html` <p class="no-comment">No comments.</p> `}
      </div>

      ${game.isOwner
        ? html`
            <div class="buttons">
              <a href="/catalog/${game._id}/edit" class="button">Edit</a>
              <a href="javascript:void(0)" class="button" @click=${onDelete}
                >Delete</a
              >
            </div>
          `
        : null}
    </div>
    ${userData && !game.isOwner
      ? html`
          <article class="create-comment">
            <label>Add new comment:</label>
            <form class="form" @submit=${onSubmit}>
              <textarea name="comment" placeholder="Comment......"></textarea>
              <input class="btn submit" type="submit" value="Add Comment" />
            </form>
          </article>
        `
      : null}
  </section>
`;
export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const game = await getById(id);
  const userData = getUserData();
  const comments = await getComments(id);

  if (userData) {
    game.isOwner = game._ownerId == userData._id;
  }
  ctx.render(
    detailsTemplate(
      game,
      onDelete,
      comments,
      userData,
      createSubmitHandler(onSubmit)
    )
  );
  async function onDelete() {
    const choice = confirm("Are you sure?");

    if (choice) {
      await deleteGame(id);
      ctx.page.redirect("/");
    }
  }

  async function onSubmit({ comment }, form) {
    if (comment == "") {
      return alert("All fields are required");
    }
    await makeComment(id, comment);
    form.reset();

    ctx.page.redirect("/catalog/" + id);
  }
}
