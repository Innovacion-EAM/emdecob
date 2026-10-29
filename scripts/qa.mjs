import puppeteer from "puppeteer-core";

const base = process.env.BASE_URL || "http://localhost:3000";
const routes = [
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
  "/ruta-inexistente/",
];

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--font-render-hinting=none"],
});

let problems = 0;

for (const viewport of viewports) {
  for (const route of routes) {
    const page = await browser.newPage();
    await page.setViewport({ width: viewport.width, height: viewport.height, deviceScaleFactor: 1 });
    const response = await page.goto(base + route, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(async () => {
      await document.fonts.ready;
      const style = document.createElement("style");
      style.textContent = "[data-reveal]{opacity:1!important;transform:none!important}";
      document.head.appendChild(style);
    });
    // Load lazy content and trigger every reveal.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 35));
      }
      window.scrollTo(0, document.body.scrollHeight);
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((resolve) => setTimeout(resolve, 300));

    const audit = await page.evaluate(() => {
      const vw = window.innerWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const visibleImages = [...document.images].filter(
        (img) => img.getAttribute("aria-hidden") !== "true",
      );
      const brokenImages = visibleImages
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.getAttribute("src"));
      const emptyLinks = [...document.querySelectorAll("a")]
        .filter((a) => !a.getAttribute("href") || a.getAttribute("href") === "#")
        .map((a) => a.textContent?.trim().slice(0, 60));
      const internalLinks = [...document.querySelectorAll("a[href^='/']")]
        .map((a) => a.getAttribute("href"))
        .filter((href) => href && !href.startsWith("/images/") && !href.startsWith("/fonts/") && !href.startsWith("/_next/"));
      const h1s = [...document.querySelectorAll("h1")].map((h) => h.textContent?.trim());
      const imgWithoutAlt = visibleImages.filter((img) => !img.hasAttribute("alt")).length;
      const fieldsWithoutLabel = [...document.querySelectorAll("input, select, textarea")]
        .filter((field) => {
          if (field.type === "hidden" || field.type === "submit" || field.type === "button") return false;
          if (field.getAttribute("aria-label") || field.getAttribute("aria-labelledby")) return false;
          return !field.closest("label") && (!field.id || !document.querySelector(`label[for="${CSS.escape(field.id)}"]`));
        })
        .map((field) => field.getAttribute("name") || field.type);
      const fontFamilies = [...new Set([...document.querySelectorAll("h1,h2,h3,p,a")].slice(0, 50).map((el) => getComputedStyle(el).fontFamily))];
      return {
        h1s,
        scrollWidth,
        vw,
        brokenImages,
        emptyLinks,
        internalLinks,
        imgWithoutAlt,
        fieldsWithoutLabel,
        fontFamilies,
        sections: document.querySelectorAll("section").length,
      };
    });

    const expected404 = route.includes("inexistente");
    const hasProblem =
      response?.status() !== (expected404 ? 404 : 200) ||
      audit.brokenImages.length > 0 ||
      audit.emptyLinks.length > 0 ||
      audit.h1s.length !== 1 ||
      audit.scrollWidth > audit.vw + 2 ||
      audit.imgWithoutAlt > 0 ||
      audit.fieldsWithoutLabel.length > 0;

    if (hasProblem) problems += 1;
    console.log(
      `${hasProblem ? "FAIL" : "OK  "} ${viewport.name.padEnd(7)} ${String(response?.status()).padEnd(3)} ${route} ` +
        `sections=${audit.sections} scroll=${audit.scrollWidth}/${audit.vw} h1=${audit.h1s.length} ` +
        `img=${audit.brokenImages.length} alt=${audit.imgWithoutAlt} fields=${audit.fieldsWithoutLabel.length}`,
    );
    if (audit.h1s.length !== 1) console.log("  h1:", audit.h1s);
    if (audit.brokenImages.length) console.log("  broken:", audit.brokenImages);
    if (audit.emptyLinks.length) console.log("  empty links:", audit.emptyLinks);
    if (audit.imgWithoutAlt) console.log("  images without alt:", audit.imgWithoutAlt);
    if (audit.fieldsWithoutLabel.length) console.log("  unlabeled fields:", audit.fieldsWithoutLabel);
    if (audit.fontFamilies.some((font) => font.includes("Sora") === false && font.includes("Manrope") === false && !font.includes("sans-serif"))) {
      console.log("  unexpected fonts:", audit.fontFamilies);
    }

    await page.close();
  }
}

await browser.close();
console.log(problems === 0 ? "All checks passed." : `${problems} route/viewport combinations failed.`);
process.exitCode = problems === 0 ? 0 : 1;
