import path from "path";
import fs from "fs";

export default function bootstrap() {
    console.log("Bootstrapping launch...");

    console.log("Patching bundles...");
    const main = patchBundles();

    console.log("Patching `require`...");
    patchRequire();

    require(main);
}

function patchBundles() {
    const main = path.join(__dirname, "../dist/main/main.bundle.js");
    const patchedMain = path.join(__dirname, "../dist/main/main.bundle.patched.js");
    const index = path.join(__dirname, "../dist/renderer/index.html");
    const patchedIndex = path.join(__dirname, "../dist/renderer/index.modified.html");
    const renderer = path.join(__dirname, "../dist/renderer/renderer.bundle.js");
    const patchedRenderer = path.join(__dirname, "../dist/renderer/renderer.bundle.patched.js");

    console.log("Patching " + main);
    let mainData = fs.readFileSync(main, "utf8");
    mainData = mainData.replace("var installedModules = {};", "global.installedModules = {}; global.modules = modules;");
    mainData = mainData.replace("__webpack_require__.e = ", "global.__webpack_require__ = __webpack_require__; __webpack_require__.e = ");
    mainData = mainData.replace("index.html", "index.modified.html");
    // mainData = mainData.replace("module.exports =", "global.whatthefuckisthis = module.exports =");
    fs.writeFileSync(patchedMain, mainData, "utf8");
    console.log("Writing to " + patchedMain);

    console.log("Patching " + index);
    let indexData = fs.readFileSync(index, "utf8");
    indexData = indexData.replace("renderer.bundle.js", "renderer.bundle.patched.js");
    fs.writeFileSync(patchedIndex, indexData, "utf8");
    console.log("Writing to " + patchedIndex);

    console.log("Patching " + renderer);
    let rendererData = fs.readFileSync(renderer, "utf8");
    rendererData = rendererData.replace("var installedModules = {};", "global.installedModules = {}; global.modules = modules;");
    rendererData = rendererData.replace("__webpack_require__.e = ", "global.__webpack_require__ = __webpack_require__; __webpack_require__.e = ");
    // rendererData = rendererData.replace("module.exports =", "global.whatthefuckisthis = module.exports =");
    fs.writeFileSync(patchedRenderer, rendererData, "utf8");
    console.log("Writing to " + patchedRenderer);

    return patchedMain;
}

function patchRequire() {
    const oldRequire = require;
    require = Object.assign(
        (id: string) => {
            console.log("Requiring: " + id);
            return oldRequire(id);
        },
        {
            ...oldRequire
        }
    );
}
