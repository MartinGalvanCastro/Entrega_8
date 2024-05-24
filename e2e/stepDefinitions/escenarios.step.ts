import { Given, When, Then, After } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { IPlaywrightWorld, Browsers } from "../world";

//Variables
const adminPrefixUrl = "/ghost/#";
let esTemaClaro: boolean | undefined;
let tituloContenido: string | undefined;

/** ***************
 * GIVEN
 * ***************/

Given(
  "Se esta usando el navegador {string}",
  async function (this: IPlaywrightWorld, navegador: Browsers) {
    await this.init(navegador);
  }
);

Given("Un usuario administrador", async function (this: IPlaywrightWorld) {
  this.adminUser = process.env.ADMIN_USER!;
  this.adminPassword = process.env.ADMIN_PASS!;
});

/** ***************
 * WHEN
 * ***************/

When("Inicia sesion", async function (this: IPlaywrightWorld) {
  await this.page.goto("/ghost");
  await this.page.waitForURL(`${this.baseUrl}${adminPrefixUrl}/signin`);
  await this.page.getByLabel("Email address").fill(this.adminUser!);
  await this.page.getByLabel("Password").fill(this.adminPassword!);
  await this.page.getByRole("button", { name: /Sign in/i }).click();
  await this.page.waitForURL(`${this.baseUrl}/ghost/#/dashboard`);
});

When("Cambia el tema", async function (this: IPlaywrightWorld) {
  const disabledAtributo = await this.page
    .locator("head link#dark-styles")
    .getAttribute("disabled");
  esTemaClaro = disabledAtributo !== null;
  await this.page.locator("div.nightshift-toggle").click();
  await this.page.waitForTimeout(1 * 1000);
});

When(
  "Navega al menu de {string}",
  async function (this: IPlaywrightWorld, menu: string) {
    await this.page.locator(`a[data-test-nav="${menu}"]`).click();
  }
);

When(
  "Invita un miembro del staff como {string}",
  async function (
    this: IPlaywrightWorld,
    rol: "Contributor" | "Author" | "Editor" | "Administrator"
  ) {
    await this.page.waitForTimeout(10 * 1000);
    const email = `${rol}-${this.dataGenerator.number.int({
      min: 100,
      max: 200,
    })}-${this.dataGenerator.internet.email()}`;
    const roleId = {
      Contributor: " 66302eace06f17004f315852",
      Author: "66302eace06f17004f315851",
      Editor: "66302eace06f17004f315850",
      Administrator: "66302eace06f17004f31584f",
    };
    const modal = await this.page.locator(
      'section[data-testid="invite-user-modal"]'
    );

    console.log(email);

    await this.page.route("/ghost/api/admin/invites/", async (route) => {
      await route.fulfill({
        status: 200,
        json: {
          invites: [
            {
              id: this.dataGenerator.string.uuid(),
              email,
              expires: null,
              role_id: this.dataGenerator.string.uuid(),
              status: null,
              token: null,
            },
          ],
        },
      });
    });

    await this.page
      .getByRole("button", { name: "Invite people", exact: true })
      .click();

    await modal.getByLabel("Email address").fill(email);

    await modal.getByText(rol, { exact: true }).click();
    await modal.getByRole("button", { name: "Send invitation now" }).click();
  }
);

/** ***************
 * THEN
 * ***************/

Then(
  "Visualiza el dashboard de administrador",
  async function (this: IPlaywrightWorld) {
    await expect(this.page).toHaveURL(
      `${this.baseUrl}${adminPrefixUrl}/dashboard`
    );
    await expect(
      this.page.getByRole("heading", { name: /Dashboard/i })
    ).toBeVisible();
  }
);

Then("Visualiza que el tema cambio", async function (this: IPlaywrightWorld) {
  const cambioTema = await this.page
    .locator("head link#dark-styles")
    .getAttribute("disabled");
  expect(cambioTema !== null).toBe(!esTemaClaro);
});

Then(
  "Verifica que la invitacion se envio correctamente",
  async function (this: IPlaywrightWorld) {
    await expect(
      this.page.getByText("Invitation successfully sent to")
    ).toBeVisible();
  }
);
