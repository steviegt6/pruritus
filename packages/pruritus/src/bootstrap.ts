import path from "path";
import fs from "fs";

export function bootstrapMain() {
    console.log("Bootstrapping main...");

    console.log("Patching `require`...");
    patchRequire();

    console.log("Patching bundles...");
    const main = patchBundles();

    require(main);
}

export function bootstrapRenderer() {
    console.log("Bootstrapping renderer...");

    console.log("Patching `require`...");
    patchRequire();
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
    mainData = mainData.replace("__webpack_require__.m = ", "global.__webpack_require__ = __webpack_require__; __webpack_require__.m = ");
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
    rendererData = 'require("../../pruritus/bootstrap.js").bootstrapRenderer();' + rendererData + '\nrequire("./resources/app/pruritus/renderer.js")';
    // rendererData = rendererData.replace("module.exports =", "global.whatthefuckisthis = module.exports =");
    fs.writeFileSync(patchedRenderer, rendererData, "utf8");
    console.log("Writing to " + patchedRenderer);

    return patchedMain;
}

function patchRequire() {
    const Module = require("module");
    const oldRequire = Module.prototype.require;
    Module.prototype.require = Object.assign(
        (id: string) => {
            console.log("Requiring: " + id);

            if (id.startsWith("kitch/src/")) {
                const name = "./src/" + id.substring("kitch/src/".length) + ".ts";
                if (!modules[name]) console.error("Cannot resolve kitch (main doesn't use named modules!): " + name);
                console.log("Resolving kitch module: " + name);
                return resolveExports(global.__webpack_require__(name));
            } else if (id.startsWith("./kitch/src/")) {
                const name = "./src/" + id.substring("./kitch/src/".length) + ".ts";
                if (!modules[name]) console.error("Cannot resolve kitch (main doesn't use named modules!): " + name);
                console.log("Resolving kitch module: " + name);
                return resolveExports(global.__webpack_require__(name));
            }

            try {
                return oldRequire(id);
            } catch {
                try {
                    console.log("Failed to resolve, assuming node_modules: " + id);
                    const name = "./node_modules" + id + ".js";
                    return resolveExports(global.__webpack_require__(name));
                } catch {
                    console.error("Failed to resolve as kitch, relative path, and node_modules: " + id);
                    console.log(process.cwd());
                    console.log(fs.readdirSync("."));
                    return undefined;
                }
            }
        },
        {
            ...oldRequire
        }
    );
    console.log(require);
}

function resolveExports(module: any): any {
    return module;
}
