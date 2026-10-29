import fs from "fs";
import path from "path";

const outDir = path.join(process.cwd(), "out");
const basePath = "/emdecob";

function processHtmlFile(filePath) {
  let fileContent = fs.readFileSync(filePath, "utf8");
  
  // Split into RSC payload and HTML portion
  const htmlStart = fileContent.indexOf("<!DOCTYPE html>");
  if (htmlStart === -1) return;
  
  const rscPayload = fileContent.substring(0, htmlStart);
  const htmlContent = fileContent.substring(htmlStart);
  
  // Fix RSC payload paths (JSON-like format with escaped quotes)
  // Pattern: "/images/xxx.webp\"," -> "/emdecob/images/xxx.webp\","
  let fixedRsc = rscPayload
    .replace(/"\/images\//g, `"/${basePath}/images/`)
    .replace(/"\/videos\//g, `"/${basePath}/videos/`);
  
  // Fix HTML content (standard attributes)
  let fixedHtml = htmlContent
    .replace(/src="\/images\//g, `src="${basePath}/images/`)
    .replace(/src="\/videos\//g, `src="${basePath}/videos/`)
    .replace(/poster="\/images\//g, `poster="${basePath}/images/`)
    .replace(/href="\/images\//g, `href="${basePath}/images/`)
    .replace(/href="\/videos\//g, `href="${basePath}/videos/`);
  
  // Fix preload links and other HTML attributes with single quotes or no quotes
  fixedHtml = fixedHtml
    .replace(/href='\/images\//g, `href='${basePath}/images/`)
    .replace(/href='\/videos\//g, `href='${basePath}/videos/`);
  
  // Fix JSON-LD image URLs
  fixedHtml = fixedHtml
    .replace(/"url": "https:\/\/emdecob\.com\/images\//g, `"url": "https://innovacion-eam.github.io${basePath}/images/`)
    .replace(/"url": "\/images\//g, `"url": "${basePath}/images/`);
  
  fs.writeFileSync(filePath, fixedRsc + fixedHtml, "utf8");
}

function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name.endsWith(".html")) {
      processHtmlFile(fullPath);
    }
  }
}

processDirectory(outDir);
console.log("✅ Fixed asset paths in all HTML files (including RSC payload format)");
