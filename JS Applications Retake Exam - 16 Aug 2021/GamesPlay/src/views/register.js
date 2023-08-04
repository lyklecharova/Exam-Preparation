import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

const registerTemplate = (onRegister) => html`
  <section id="register-page" class="content auth">
    <form id="register" @submit=${onRegister}>
      <div class="container">
        <div class="brand-logo"></div>
        <h1>Register</h1>

        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="maria@email.com"
        />

        <label for="pass">Password:</label>
        <input type="password" name="password" id="register-password" />

        <label for="con-pass">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password" />

        <input class="btn submit" type="submit" value="Register" />

        <p class="field">
          <span
            >If you already have profile click <a href="/login">here</a></span
          >
        </p>
      </div>
    </form>
  </section>
`;

export function registerPage(ctx) {
  ctx.render(registerTemplate(createSubmitHandler(onRegister)));

  async function onRegister(
    { email, password, ["confirm-password"]: repass },
    form
  ) {
    if (email == "" || password == "") {
      return alert("All fields are required");
    }
    if (password != repass) {
      return alert("Passwords don't match");
    }
    await register(email, password);
    form.reset();

    ctx.page.redirect("/");
  }
}
