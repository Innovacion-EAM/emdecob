import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1000 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });

// Desktop services dropdown.
await page.hover(".nav-item .nav-link");
await new Promise((resolve) => setTimeout(resolve, 400));
const panel = await page.$eval(".nav-panel", (element) => ({
  open: element.dataset.open,
  visibility: getComputedStyle(element).visibility,
  opacity: getComputedStyle(element).opacity,
  rect: (() => {
    const rect = element.getBoundingClientRect();
    return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
  })(),
}));
console.log("desktop dropdown", panel);

// Intermediate width: both nav CTAs must be present.
await page.setViewport({ width: 1024, height: 900 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
console.log(
  "1024 CTAs",
  await page.$$eval(".nav-actions .btn", (items) =>
    items.map((item) => ({ text: item.textContent.trim(), display: getComputedStyle(item).display })),
  ),
);

// Mobile menu, focus, trap, close.
await page.setViewport({ width: 390, height: 844 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });
await page.click(".mobile-toggle");
await new Promise((resolve) => setTimeout(resolve, 300));
console.log(
  "mobile menu",
  await page.$eval(".mobile-menu", (element) => {
    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      scrollHeight: element.scrollHeight,
      overflow: getComputedStyle(element).overflowY,
      bodyOverflow: getComputedStyle(document.body).overflow,
      focused: document.activeElement?.getAttribute("aria-label"),
    };
  }),
);
for (let index = 0; index < 20; index += 1) await page.keyboard.press("Tab");
console.log(
  "focus stays inside",
  await page.evaluate(() => Boolean(document.activeElement?.closest(".mobile-menu"))),
);
await page.keyboard.press("Escape");
await new Promise((resolve) => setTimeout(resolve, 200));
console.log(
  "menu closed",
  (await page.$(".mobile-menu")) === null,
  "focus",
  await page.evaluate(() => document.activeElement?.className),
  "body",
  await page.evaluate(() => getComputedStyle(document.body).overflow),
);

// Blog filter.
await page.setViewport({ width: 1440, height: 1000 });
await page.goto("http://localhost:3000/blog/", { waitUntil: "networkidle0" });
await page.click('.blog-cat[aria-pressed="false"]');
await new Promise((resolve) => setTimeout(resolve, 250));
console.log(
  "blog filter",
  await page.evaluate(() => ({
    active: document.querySelector('.blog-cat[aria-pressed="true"]')?.textContent,
    featured: document.querySelector(".blog-featured h2")?.textContent,
    cards: document.querySelectorAll(".post-grid .post-card").length,
    note: document.querySelector(".blog-filter-note")?.textContent.trim(),
    scrollWidth: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
  })),
);
await page.click('.blog-cat[aria-pressed="true"]');
await new Promise((resolve) => setTimeout(resolve, 200));
console.log(
  "blog reset",
  await page.evaluate(() => ({
    active: document.querySelector('.blog-cat[aria-pressed="true"]')?.textContent,
    cards: document.querySelectorAll(".post-grid .post-card").length,
    note: Boolean(document.querySelector(".blog-filter-note")),
  })),
);

// Contact form.
await page.goto("http://localhost:3000/contacto/", { waitUntil: "networkidle0" });
console.log(
  "form tabs",
  await page.$$eval(".tab", (items) =>
    items.map((item) => ({ text: item.textContent.trim(), pressed: item.getAttribute("aria-pressed") })),
  ),
);
await page.type("#nombre", "Prueba QA");
await page.type("#correo", "qa@example.com");
await page.type("#telefono", "3001234567");
await page.type("#mensaje", "Mensaje de prueba del prototipo.");
await page.click("input[name=consentimiento]");
const [response] = await Promise.all([
  page.waitForResponse(
    (item) => item.url().endsWith("/api/contacto/") && item.request().method() === "POST",
  ),
  page.click(".form-submit button[type=submit]"),
]);
console.log("form status", response.status(), await response.text());
await new Promise((resolve) => setTimeout(resolve, 400));
console.log(
  "success visible",
  await page.$eval(".form-success h3", (element) => element.textContent.trim()).catch(() => null),
);

// Mobile layout after interactions.
const overflow = [];
for (const route of ["/", "/servicios/contact-center/", "/blog/", "/contacto/", "/juricob/"]) {
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle0" });
  const result = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
    h1: (() => {
      const h1 = document.querySelector("h1");
      const rect = h1?.getBoundingClientRect();
      return {
        text: h1?.textContent?.trim(),
        fontSize: h1 ? getComputedStyle(h1).fontSize : null,
        height: rect ? Math.round(rect.height) : null,
      };
    })(),
  }));
  overflow.push({ route, ...result });
  console.log("mobile layout", route, result);
}

await browser.close();
