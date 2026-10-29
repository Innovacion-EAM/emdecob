import puppeteer from "puppeteer-core";
const browser=await puppeteer.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const page=await browser.newPage();
await page.setJavaScriptEnabled(false);
await page.setViewport({width:1440,height:1000});
await page.goto('http://localhost:3000/',{waitUntil:'networkidle0'});
const data=await page.evaluate(()=>({
  revealOpacity:getComputedStyle(document.querySelector('[data-reveal]')).opacity,
  revealCount:document.querySelectorAll('[data-reveal]').length,
  h1:document.querySelector('h1')?.textContent.trim(),
  noscript:document.querySelector('noscript')?.textContent?.slice(0,120),
  bodyBg:getComputedStyle(document.body).backgroundColor,
  font:getComputedStyle(document.body).fontFamily,
}));
console.log(data);
await browser.close();
