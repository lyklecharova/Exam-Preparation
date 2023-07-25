import { html } from "../../node_modules/lit-html/lit-html.js";
import { like, getLikes, getUserLikes } from "../data/likes.js";
import { deleteBook, getById } from "../data/books.js";
import { getUserData } from "../util.js";

const detailsTemplate = (book, onDelete, onLike) => html` <section
  id="details-page"
  class="details"
>
  <div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}" /></p>
    <div class="actions">
      ${book.canEdit || book.canLike
        ? html`
            ${book.canEdit
              ? html` <a class="button" href="/${book._id}/edit">Edit</a>
                  <a
                    class="button"
                    @click="${onDelete}"
                    href="javascript:void(0)"
                    >Delete</a
                  >`
              : null}
            ${book.canLike
              ? html`<a
                  class="button"
                  @click="${onLike}"
                  href="javascript:void(0)"
                  >Like</a
                >`
              : null}
          `
        : null}

      <div class="likes">
        <img class="hearts" src="/images/heart.png" />
        <span id="total-likes">Likes: ${book.likes}</span>
      </div>
    </div>
  </div>
  <div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
  </div>
</section>`;

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const requests = [getById(id), getLikes(id)];

  const userData = getUserData();

  if (userData) {
    requests.push(getUserLikes(id, userData._id));
  }

  const [book, likes, hasLiked] = await Promise.all(requests);
  book.likes = likes;
  if (userData) {
    book.canEdit = userData._id == book._ownerId;
    book.canLike = book.canEdit == false && hasLiked == 0;
  }

  ctx.render(detailsTemplate(book, onDelete, onLike));

  async function onDelete() {
    const choice = confirm("Are you sure?");

    if (choice) {
      await deleteBook(id);
      ctx.page.redirect("/");
    }
  }

  async function onLike() {
    await like(id);
    ctx.page.redirect("/" + id);
  }
}
