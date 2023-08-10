import { html } from "../../node_modules/lit-html/lit-html.js";
import { search } from "../data/fruits.js";
import { getUserData } from "../util.js";

const searchTemplate = (searchFruit) => html`
  <section id="search">
    <div class="form">
      <h2>Search</h2>
      <form class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list" @click=${searchFruit}>Search</button>
      </form>
    </div>
    <h4>Results:</h4>
  </section>
`;

const resultTemplate = (searchFruit, result) => html`
  <section id="search">
    <div class="form">
      <h2>Search</h2>
      <form class="search-form">
        <input type="text" name="search" id="search-input" />
        <button class="button-list" @click=${searchFruit}>Search</button>
      </form>
    </div>

    <h4>Results:</h4>

    ${result.length > 0
      ? html`
          <div class="search-result">
            ${result.map(
              (fruit) => html`
                <div class="fruit">
                  <img src="${fruit.imageUrl}" alt="example1" />
                  <h3 class="title">${fruit.name}</h3>
                  <p class="description">${fruit.description}</p>
                  <a class="details-btn" href="/dashboard/${fruit._id}"
                    >More Info</a
                  >
                </div>
              `
            )}
          </div>
        `
      
    : html` <p class="no-result">No result.</p> `}
  </section>
`;
export function searchPage(ctx) {
  const userData = getUserData();
  ctx.render(searchTemplate(searchFruit));

  async function searchFruit(e) {
    e.preventDefault();
    const input = document.getElementById("search-input");
    const result = await search(input.value);
    ctx.render(resultTemplate(searchFruit, result, userData));
  }
}