import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyBooks } from "../data/books.js";
import { getUserData } from "../util.js";

const myBooksTemplate = (books) => html`
  <section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${books.length > 0
      ? books.map(bookCard)
      : html`<p class="no-books">No books in database!</p>`}
  </section>
`;

const bookCard = (book) => html` <ul class="my-books-list">
  <li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}" /></p>
    <a class="button" href="/${book._id}">Details</a>
  </li>
</ul>`;

export async function myBooksPage(ctx) {
  const userData = getUserData();
  const books = await getMyBooks(userData._id);
  ctx.render(myBooksTemplate(books));
}
