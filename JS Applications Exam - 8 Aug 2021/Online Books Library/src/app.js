import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { layoutTemplate } from "./views/layout.js";
import { getUserData } from "./util.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./data/auth.js";
import { addPage } from "./views/addBook.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { myBooksPage } from "./views/myBooks.js";

const root = document.getElementById("container");

page(decorateContext);
page("index.html", "/");
page("/", homePage);
page("/login", loginPage);
page("/register", registerPage);
page("/logout", logoutAction);
page("/addBook", addPage);
page("/myBooks", myBooksPage);
page("/:id", detailsPage);
page("/:id/edit", editPage);

page.start();

function decorateContext(ctx, next) {
  ctx.render = renderView;
  next();
}

function renderView(content) {
  const userData = getUserData();
  render(layoutTemplate(userData, content), root);
}

function logoutAction(ctx) {
  logout();
  ctx.page.redirect("/");
}
