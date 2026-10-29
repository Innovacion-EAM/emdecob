import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath:'/usr/bin/chromium', headless:true, args:['--no-sandbox'] });
for (const width of [1440,390]) {
  for (const route of ['/','/servicios/','/servicios/contact-center/','/emdata/','/nosotros/','/blog/','/contacto/','/juricob/']) {
    const page=await browser.newPage();
    await page.setViewport({width,height:900});
    await page.goto('http://localhost:3000'+route,{waitUntil:'networkidle0'});
    await page.evaluate(async()=>{await document.fonts.ready;const s=document.createElement('style');s.textContent='[data-reveal]{opacity:1!important;transform:none!important}';document.head.appendChild(s);});
    const data=await page.evaluate(()=>{
      const secs=[...document.querySelectorAll('main > section, main > article, main > div')].map(el=>{
        const r=el.getBoundingClientRect();
        const h=el.querySelector('h1,h2,h3');
        return {cls:el.className||el.tagName, h:Math.round(r.height), text:h?.textContent?.trim().slice(0,48)};
      });
      const h1=document.querySelector('h1'); const hr=h1?.getBoundingClientRect();
      return {title:document.title, scrollH:document.documentElement.scrollHeight, h1:{fs:h1?getComputedStyle(h1).fontSize:null, w:hr?Math.round(hr.width):null, h:hr?Math.round(hr.height):null, lines:h1?Math.round(hr.height/parseFloat(getComputedStyle(h1).lineHeight)):null}, secs};
    });
    console.log(`\n=== ${width} ${route} ${data.scrollH}px h1=${JSON.stringify(data.h1)}`);
    for (const s of data.secs) console.log(`${String(s.h).padStart(5)} ${s.cls} :: ${s.text||''}`);
    await page.close();
  }
}
await browser.close();
