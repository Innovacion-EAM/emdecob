import puppeteer from "puppeteer-core";
const browser=await puppeteer.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
for (const width of [1440,390]) {
  for (const route of ['/','/servicios/','/servicios/contact-center/','/servicios/recuperacion-de-cartera/','/servicios/propiedad-horizontal/','/servicios/juridicos/','/emdata/','/nosotros/','/blog/','/blog/preguntas-frecuentes/','/contacto/','/juricob/']) {
    const page=await browser.newPage(); await page.setViewport({width,height:900});
    await page.goto('http://localhost:3000'+route,{waitUntil:'networkidle0'});
    await page.evaluate(async()=>{await document.fonts.ready; const s=document.createElement('style');s.textContent='[data-reveal]{opacity:1!important;transform:none!important}';document.head.appendChild(s);});
    const d=await page.evaluate(()=>{const h=document.querySelector('h1');const r=h.getBoundingClientRect();const st=getComputedStyle(h);const sections=[...document.querySelectorAll('main > section, main > article')].map(e=>Math.round(e.getBoundingClientRect().height));return {h1:h.textContent.trim().replace(/\s+/g,' '),fs:st.fontSize,lh:st.lineHeight,w:Math.round(r.width),h:Math.round(r.height),lines:Math.round(r.height/parseFloat(st.lineHeight)),scroll:document.documentElement.scrollHeight,sections};});
    console.log(`${width} ${route} h1=${d.h1} fs=${d.fs} w=${d.w} h=${d.h} lines=${d.lines} scroll=${d.scroll} sections=${d.sections.join(',')}`);
    await page.close();
  }
}
await browser.close();
