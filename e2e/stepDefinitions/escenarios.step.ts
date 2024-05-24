import { Given, When, Then, After } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { IPlaywrightWorld, Browsers } from "../world";
import path from "path";

//Variables
const adminPrefixUrl = "/ghost/#";
let esTemaClaro: boolean | undefined;
let tituloContenido: string | undefined;
let nombreMetadata: string | undefined;
let nombrePerfil: string | undefined;

/** ************************
 * HOOKS
 * **************************/
After(() => {
  tituloContenido = undefined;
  esTemaClaro = undefined;
  nombreMetadata = undefined;
  nombrePerfil = undefined;
});

/** *********************
 * GIVEN
 * *********************/

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

/** *********************
 * WHEN
 * *********************/

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
    if (menu === "user-profile") {
      await this.page.locator("div.gh-user-avatar").click();
      await this.page.waitForTimeout(500);
    }
    if (["page", "post"].includes(menu)) {
      menu += "s";
    }
    await this.page.locator(`a[data-test-nav="${menu}"]`).click();
  }
);

When(
  "Invita un miembro del staff como {string}",
  async function (
    this: IPlaywrightWorld,
    rol: "Contributor" | "Author" | "Editor" | "Administrator"
  ) {
    await this.page.waitForTimeout(5 * 1000);
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
              status: "sent",
              token: this.dataGenerator.string.uuid(),
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

When("Edita metadata de la pagina", async function (this: IPlaywrightWorld) {
  nombreMetadata = this.dataGenerator.lorem.word();
  const box = await this.page.locator('div[data-testid="metadata"]');
  await box.getByText("Edit").click();
  await this.page.keyboard.press("Control+A");
  await this.page.keyboard.type(nombreMetadata);
  await this.page.getByRole("button", { name: "save" }).click();
});

When(
  "Filtra los usuarios por un nombre",
  async function (this: IPlaywrightWorld) {
    const correo = "Filtered Member";
    await this.page
      .locator('input[data-test-input="members-search"]')
      .fill(correo);
  }
);

When("Navega al dashboard", async function (this: IPlaywrightWorld) {
  await this.page.goto(adminPrefixUrl);
});

When(
  "Actualiza su informacion del perfil",
  async function (this: IPlaywrightWorld) {
    nombrePerfil = this.dataGenerator.person.fullName();
    await this.page.getByLabel("Full name").fill(nombrePerfil);
  }
);

When("Sube una cover image", async function (this: IPlaywrightWorld) {
  const fileChooserPromise = this.page.waitForEvent("filechooser");
  try {
    await this.page
      .getByText("Upload cover image")
      .click({ timeout: 2 * 1000 });
  } catch (e) {
    await this.page
      .getByText("Delete cover image")
      .click({ timeout: 2 * 1000 });
    await this.page.waitForTimeout(2 * 1000);
    await this.page
      .getByText("Upload cover image")
      .click({ timeout: 2 * 1000 });
  }

  const fileChooser = await fileChooserPromise;
  const img = this.dataGenerator.number.int({ min: 1, max: 3 });
  await fileChooser.setFiles(path.join(__dirname, "..", "imgs", `${img}.jpeg`));
  await this.page.waitForTimeout(5 * 1000);
});

When("Guarda los cambios del perfil", async function (this: IPlaywrightWorld) {
  await this.page.getByText("Save & close").click();
  await this.page.waitForTimeout(2 * 1000);
});

When(
  "Crea {string}",
  async function (this: IPlaywrightWorld, contenido: string) {
    switch (contenido) {
      case "un articulo":
        await this.page.getByTitle("New post").click();
        await this.page.waitForURL(
          `${this.baseUrl}${adminPrefixUrl}/editor/**`
        );
        break;
      case "una pagina":
        await this.page.getByRole("link", { name: /New page/i }).click();
        await this.page.waitForURL(
          `${this.baseUrl}${adminPrefixUrl}/editor/**`
        );
        break;
      default:
        throw new Error(`No se reconoce el contenido ${contenido}`);
    }
  }
);

When(
  "Con titulo Prueba-{string} y una imagen",
  async function (this: IPlaywrightWorld, contenido: string) {
    const titlePlaceholder =
      contenido.charAt(0).toUpperCase() + contenido.slice(1);
    tituloContenido = `Prueba-${titlePlaceholder}`;
    await this.page
      .getByPlaceholder(`${titlePlaceholder} title`)
      .fill(tituloContenido);

    const fileChooserPromise = this.page.waitForEvent("filechooser");
    const img = this.dataGenerator.number.int({ min: 1, max: 3 });
    await this.page.getByRole("button", { name: "Add feature image" }).click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(
      path.join(__dirname, "..", "imgs", `${img}.jpeg`)
    );
    await this.page.waitForTimeout(5 * 1000);
  }
);

When("Publica el contenido", async function (this: IPlaywrightWorld) {
  await this.page.getByRole("button", { name: /Publish/i }).click();

  await this.page
    .getByRole("button", { name: /Continue, final review/i })
    .click();
  await this.page
    .locator('button[data-test-button="confirm-publish"]')
    .click({ force: true });
});

/** *********************
 * THEN
 * *********************/

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

Then(
  "Valida que se haya modificado la metadata de la página",
  async function (this: IPlaywrightWorld) {
    const box = await this.page.locator('div[data-testid="metadata"]');
    await box.getByText("Edit").click();
    await this.page.waitForTimeout(2 * 1000);
    expect(nombreMetadata).toBeDefined();
    await expect(this.page.getByText(nombreMetadata!).first()).toBeVisible();
  }
);

Then(
  "Verificar que las redes sociales esten bien configuradas",
  async function (this: IPlaywrightWorld) {
    const box = await this.page.locator('div[data-testid="social-accounts"]');
    await expect(
      this.page.getByText(/https?:\/\/(?:www\.)?facebook\.com(\/.*)/)
    ).toBeVisible();
    await expect(
      this.page.getByText(/https?:\/\/(?:www\.)?twitter\.com(\/.*)/)
    ).toBeVisible();
  }
);

Then(
  "Encuentra un usuario con ese nombre",
  async function (this: IPlaywrightWorld) {
    await expect(
      this.page.locator('tr[data-test-list="members-list-item"]')
    ).toHaveCount(1);
  }
);

Then(
  "Puede ver los cambios en el perfil correctamente",
  async function (this: IPlaywrightWorld) {
    await expect(await this.page.getByLabel("Full name").inputValue()).toBe(
      nombrePerfil
    );
  }
);

Then(
  "Verifica que el contenido se visualiza de manera correcta",
  async function (this: IPlaywrightWorld) {
    await this.page.locator("a.gh-post-bookmark-wrapper").click();
    await expect(this.page.getByTitle(tituloContenido!)).toBeDefined();
  }
);
