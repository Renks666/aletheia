import {expect, test} from "@playwright/test";

const locales = ["ru", "en"] as const;

const copy = {
  ru: {
    ctaPrimary: "Получить консультацию",
    submit: "Отправить заявку",
    detailsTitle: "Добавить детали кейса",
    detailsSubmit: "Отправить детали",
    detailsSuccess: "Дополнительная информация сохранена",
    privacy: "Политика конфиденциальности",
    consent: "Согласие на обработку персональных данных",
    services: "Услуги",
    menu: "Open menu",
  },
  en: {
    ctaPrimary: "Get legal consultation",
    submit: "Send request",
    detailsTitle: "Add case details",
    detailsSubmit: "Send details",
    detailsSuccess: "Additional details have been saved",
    privacy: "Privacy policy",
    consent: "Personal data consent",
    services: "Services",
    menu: "Open menu",
  },
};

for (const locale of locales) {
  test(`${locale}: landing visual + lead flow`, async ({page}, testInfo) => {
    await page.route("**/api/leads", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ok: true,
          requestId: "3f7f25d9-8138-4645-a092-ec12e06d85fb",
          detailsToken: "signed-token",
          channels: ["email"],
          partial: false,
        }),
      });
    });

    await page.route("**/api/leads/details", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          ok: true,
          requestId: "3f7f25d9-8138-4645-a092-ec12e06d85fb",
          channels: ["email"],
          partial: false,
        }),
      });
    });

    await page.goto(`/${locale}`);
    await expect(page.locator("[data-site-header]")).toBeVisible();
    await expect(page.locator("#lead-form")).toBeVisible();

    const viewport = page.viewportSize();

    if ((viewport?.width ?? 0) < 1024) {
      await page.getByLabel(copy[locale].menu).click();
      await expect(page.getByRole("link", {name: copy[locale].services}).first()).toBeVisible();
      await page.getByRole("link", {name: copy[locale].services}).first().click();
    } else {
      await page.getByRole("link", {name: copy[locale].services}).first().click();
    }

    await expect.poll(async () => page.url()).toContain("#services");

    const screenshot = await page.screenshot({fullPage: true});
    await testInfo.attach(`${locale}-${testInfo.project.name}-landing`, {
      body: screenshot,
      contentType: "image/png",
    });

    await page.getByRole("button", {name: copy[locale].ctaPrimary}).first().click();
    await page.locator("#lead-form").scrollIntoViewIfNeeded();

    await page.getByLabel(/name|имя/i).fill("Ivan Ivanov");
    await page.getByLabel(/phone|телефон/i).fill("+79991234567");
    await page.getByLabel(/^Email$/).fill("client@example.com");
    await page.getByLabel(/describe|опишите/i).fill("Нужна консультация по спору");
    await page.getByRole("checkbox").first().click();

    await page.getByRole("button", {name: copy[locale].submit}).first().click();
    await expect(page.getByText(copy[locale].detailsTitle)).toBeVisible();

    await page.getByPlaceholder(/Provide additional context|Опишите дополнительные обстоятельства/i).fill(
      "Дополнительные подробности по делу для второго шага",
    );
    await page.getByRole("button", {name: copy[locale].detailsSubmit}).click();
    await expect(page.getByText(copy[locale].detailsSuccess)).toBeVisible();
  });

  test(`${locale}: legal pages and closed routes`, async ({page}) => {
    await page.goto(`/${locale}/legal/privacy`);
    await expect(page.getByRole("heading", {name: copy[locale].privacy})).toBeVisible();

    await page.goto(`/${locale}/legal/consent`);
    await expect(page.getByRole("heading", {name: copy[locale].consent})).toBeVisible();

    const loginResponse = await page.goto(`/${locale}/login`);
    expect(loginResponse?.status()).toBe(404);
    await expect(page.getByRole("heading", {name: "Страница недоступна"})).toBeVisible();

    const portalResponse = await page.goto(`/${locale}/portal`);
    expect(portalResponse?.status()).toBe(404);
    await expect(page.getByRole("heading", {name: "Страница недоступна"})).toBeVisible();
  });
}
