import fs from "fs";
import path from "path";

const outDir = path.join(process.cwd(), "out");
const basePath = "/emdecob";

function processHtmlFile(filePath) {
  let fileContent = fs.readFileSync(filePath, "utf8");
  
  const htmlStart = fileContent.indexOf("<!DOCTYPE html>");
  const rscPayload = htmlStart >= 0 ? fileContent.substring(0, htmlStart) : "";
  const htmlContent = htmlStart >= 0 ? fileContent.substring(htmlStart) : fileContent;
  
  // RSC payload patterns (with escaped quotes \")
  let fixedRsc = rscPayload;
  // Pattern: "/images/xxx\"  (note: backslash-quote at end)
  fixedRsc = fixedRsc.replace(new RegExp('"\\\\/images\\\\/[^"\\\\]*"\\\\"', 'g'), (m) => m.replace('"/images/', `"/${basePath}/images/`));
  fixedRsc = fixedRsc.replace(new RegExp('"\\\\/videos\\\\/[^"\\\\]*"\\\\"', 'g'), (m) => m.replace('"/videos/', `"/${basePath}/videos/`));
  // Pattern: "poster":"/images/xxx\"
  fixedRsc = fixedRsc.replace(new RegExp('"poster":"\\\\/images\\\\/[^"\\\\]*"\\\\"', 'g'), (m) => m.replace('"/images/', `"/${basePath}/images/`));
  fixedRsc = fixedRsc.replace(new RegExp('"src":"\\\\/images\\\\/[^"\\\\]*"\\\\"', 'g'), (m) => m.replace('"/images/', `"/${basePath}/images/`));
  fixedRsc = fixedRsc.replace(new RegExp('"src":"\\\\/videos\\\\/[^"\\\\]*"\\\\"', 'g'), (m) => m.replace('"/videos/', `"/${basePath}/videos/`));
  // Pattern with space: "poster": "/images/xxx\"
  fixedRsc = fixedRsc.replace(new RegExp('"poster": "\\\\/images\\\\/[^"\\\\]*"\\\\"', 'g'), (m) => m.replace('"/images/', `"/${basePath}/images/`));
  fixedRsc = fixedRsc.replace(new RegExp('"src": "\\\\/images\\\\/[^"\\\\]*"\\\\"', 'g'), (m) => m.replace('"/images/', `"/${basePath}/images/`));
  fixedRsc = fixedRsc.replace(new RegExp('"src": "\\\\/videos\\\\/[^"\\\\]*"\\\\"', 'g'), (m) => m.replace('"/videos/', `"/${basePath}/videos/`));
  
  // HTML content patterns
  let fixedHtml = htmlContent;
  fixedHtml = fixedHtml.replace(/src="\/images\//g, `src="${basePath}/images/`);
  fixedHtml = fixedHtml.replace(/src="\/videos\//g, `src="${basePath}/videos/`);
  fixedHtml = fixedHtml.replace(/poster="\/images\//g, `poster="${basePath}/images/`);
  fixedHtml = fixedHtml.replace(/href="\/images\//g, `href="${basePath}/images/`);
  fixedHtml = fixedHtml.replace(/href="\/videos\//g, `href="${basePath}/videos/`);
  fixedHtml = fixedHtml.replace(/src='\/images\//g, `src='${basePath}/images/`);
  fixedHtml = fixedHtml.replace(/src='\/videos\//g, `src='${basePath}/videos/`);
  fixedHtml = fixedHtml.replace(/href='\/images\//g, `href='${basePath}/images/`);
  fixedHtml = fixedHtml.replace(/href='\/videos\//g, `href='${basePath}/videos/`);
  
  // JSON-LD
  fixedHtml = fixedHtml.replace(/"url": "https:\/\/emdecob\.com\/images\//g, `"url": "https://innovacion-eam.github.io${basePath}/images/`);
  fixedHtml = fixedHtml.replace(/"url": "\/images\//g, `"url": "${basePath}/images/`);
  
  fs.writeFileSync(filePath, fixedRsc + fixedHtml, "utf8");
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) processDirectory(fullPath);
    else if (entry.name.endsWith(".html")) processHtmlFile(fullPath);
  }
}

processDirectory(outDir);
console.log("✅ Fixed asset paths in all HTML files");
