import {expect, test} from "@playwright/test";

const locales = ["ru", "en"] as const;

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
      await page.locator('[aria-controls="mobile-menu"]').click();
      await expect(page.locator('#mobile-menu a[href="#services"]').first()).toBeVisible();
      await page.locator('#mobile-menu a[href="#services"]').first().click();
    } else {
      await page.locator('a[href="#services"]').first().click();
    }

    await expect.poll(async () => page.url()).toContain("#services");

    const screenshot = await page.screenshot({fullPage: true});
    await testInfo.attach(`${locale}-${testInfo.project.name}-landing`, {
      body: screenshot,
      contentType: "image/png",
    });

    await page.locator("#lead-form").scrollIntoViewIfNeeded();

    await page.locator("#lead-name").fill("Ivan Ivanov");
    await page.locator("#lead-phone").fill("+79991234567");
    await page.locator("#lead-email").fill("client@example.com");
    await page.getByLabel(/your role|ваша роль/i).click();
    await page.getByRole("option").first().click();
    await page.getByLabel(/service area|направление вопроса/i).click();
    await page.getByRole("option").first().click();
    await page.locator("#lead-message").fill("РќСѓР¶РЅР° РєРѕРЅСЃСѓР»СЊС‚Р°С†РёСЏ РїРѕ СЃРїРѕСЂСѓ");
    await page.getByRole("checkbox").first().click();

    await page.getByRole("button", {name: /Send request|Отправить заявку/i}).first().click();
    await expect(page.getByText(/Add case details|Добавить детали кейса/i)).toBeVisible();

    await page
      .locator("form")
      .nth(1)
      .locator("textarea")
      .fill("Р”РѕРїРѕР»РЅРёС‚РµР»СЊРЅС‹Рµ РїРѕРґСЂРѕР±РЅРѕСЃС‚Рё РїРѕ РґРµР»Сѓ РґР»СЏ РІС‚РѕСЂРѕРіРѕ С€Р°РіР°");
    await page.getByRole("button", {name: /Send details|Отправить детали/i}).click();
    await expect(page.getByText(/Additional details have been saved|Дополнительная информация сохранена/i)).toBeVisible();
  });

  test(`${locale}: legal pages and closed routes`, async ({page}) => {
    await page.goto(`/${locale}/legal/privacy`);
    await expect(page.getByRole("heading", {name: /Privacy policy|Политика конфиденциальности/i})).toBeVisible();

    await page.goto(`/${locale}/legal/consent`);
    await expect(page.getByRole("heading", {name: /Personal data consent|Согласие на обработку персональных данных/i})).toBeVisible();

    const loginResponse = await page.goto(`/${locale}/login`);
    expect(loginResponse?.status()).toBe(404);
    await expect(page.getByRole("heading", {name: "РЎС‚СЂР°РЅРёС†Р° РЅРµРґРѕСЃС‚СѓРїРЅР°"})).toBeVisible();

    const portalResponse = await page.goto(`/${locale}/portal`);
    expect(portalResponse?.status()).toBe(404);
    await expect(page.getByRole("heading", {name: "РЎС‚СЂР°РЅРёС†Р° РЅРµРґРѕСЃС‚СѓРїРЅР°"})).toBeVisible();
  });
}


