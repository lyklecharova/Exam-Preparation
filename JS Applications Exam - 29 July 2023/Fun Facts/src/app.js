import page from "../node_modules/page/page.mjs";
import { render } from "../node_modules/lit-html/lit-html.js";
import { layoutTemplate } from "./views/layout.js";
import { getUserData } from "./util.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from "./data/auth.js";
import { catalogPage } from "./views/catalog.js";
import { detailsPage } from "./views/details.js";
import { createPage } from "./views/create.js";
import { editPage } from "./views/edit.js";

// import * as api from "./data/offers.js";
// window.api = api;

const root = document.getElementById("wrapper");

page(decorateContext);
page("index.html", "/");
page("/", homePage);
page("/catalog", catalogPage);
page("/catalog/:id", detailsPage);
page("/catalog/:id/edit", editPage);
page("/create", createPage);
page("/login", loginPage);
page("/register", registerPage);
page("/logout", logoutAction);

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