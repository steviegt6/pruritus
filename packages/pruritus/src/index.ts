import path from "path";
import fs from "fs";

const main = path.join(__dirname, "../dist/main/main.bundle.js");
const patchedMain = path.join(__dirname, "../dist/main/main.bundle.patched.js");
const index = path.join(__dirname, "../dist/renderer/index.html");
const patchedIndex = path.join(__dirname, "../dist/renderer/index.modified.html");
const renderer = path.join(__dirname, "../dist/renderer/renderer.bundle.js");
const patchedRenderer = path.join(__dirname, "../dist/renderer/renderer.bundle.patched.js");

console.log(`Running in: ${__dirname}`);
console.log("Running: " + main);

let mainData = fs.readFileSync(main, "utf8");
mainData = mainData.replace("var installedModules = {};", "global.installedModules = {};");
mainData = mainData.replace("index.html", "index.modified.html");
fs.writeFileSync(patchedMain, mainData, "utf8");

let indexData = fs.readFileSync(index, "utf8");
indexData = indexData.replace("renderer.bundle.js", "renderer.bundle.patched.js");
fs.writeFileSync(patchedIndex, indexData, "utf8");

let rendererData = fs.readFileSync(renderer, "utf8");
rendererData = rendererData.replace("var installedModules = {};", "global.installedModules = {};");
fs.writeFileSync(patchedRenderer, rendererData, "utf8");

require(patchedMain);
