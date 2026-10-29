import puppeteer from "puppeteer-core";

const base = process.env.BASE_URL || "http://localhost:3000";
const startRoutes = [
  "/",
  "/servicios/",
  "/servicios/contact-center/",
  "/servicios/recuperacion-de-cartera/",
  "/servicios/propiedad-horizontal/",
  "/servicios/juridicos/",
  "/emdata/",
  "/nosotros/",
  "/blog/",
  "/blog/que-es-emdata-y-por-que-es-diferente-a-un-software-tradicional/",
  "/blog/riesgos-de-no-contar-con-un-plan-de-recuperacion-estructurado/",
  "/blog/pasos-practicos-de-como-un-contact-center-mejora-la-experiencia-del-cliente/",
  "/blog/preguntas-frecuentes/",
  "/contacto/",
  "/juricob/",
  "/politica-de-privacidad/",
  "/politica-de-cookies/",
];

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox"],
});
const found = new Set();
for (const route of startRoutes) {
  const page = await browser.newPage();
  await page.goto(base + route, { waitUntil: "networkidle0" });
  const hrefs = await page.$$eval("a[href]", (items) =>
    items.map((item) => item.getAttribute("href")).filter(Boolean),
  );
  for (const href of hrefs) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    if (href.startsWith("/_next/") || href.startsWith("/images/") || href.startsWith("/fonts/")) continue;
    found.add(href);
  }
  await page.close();
}
await browser.close();

let failures = 0;
for (const href of [...found].sort()) {
  const response = await fetch(base + href, { redirect: "follow" });
  const finalUrl = new URL(response.url);
  const ok = response.status < 400;
  if (!ok) failures += 1;
  console.log(`${ok ? "OK  " : "FAIL"} ${response.status} ${href} -> ${finalUrl.pathname}${finalUrl.search}`);
}
console.log(`${found.size} internal links checked, ${failures} failed.`);
process.exitCode = failures ? 1 : 0;
