import puppeteer from "puppeteer-core";

const [, , url, out, width = "1440", height = "1000", full = "1"] = process.argv;
const browser = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--force-device-scale-factor=1"],
});
const page = await browser.newPage();
await page.setViewport({ width: Number(width), height: Number(height), deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
await page.evaluate(async () => {
  await document.fonts.ready;
  const style = document.createElement("style");
  style.textContent = "[data-reveal]{opacity:1!important;transform:none!important}";
  document.head.appendChild(style);
  window.scrollTo(0, document.body.scrollHeight);
});
await new Promise((resolve) => setTimeout(resolve, 1200));
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((resolve) => setTimeout(resolve, 400));
await page.screenshot({ path: out, fullPage: full === "1" });
console.log(out);
await browser.close();
