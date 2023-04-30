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
    // mainData = mainData.replace("module.exports =", "global.whatthefuckisthis = module.exports =");
    // rendererData = rendererData.replace("module.exports =", "global.whatthefuckisthis = module.exports =");

    const patchedMain = patchFile("../dist/main/main.bundle.js", (text) => {
        text = text.replace("var installedModules = {};", "global.installedModules = {}; global.modules = modules;");
        text = text.replace("__webpack_require__.m = ", "global.__webpack_require__ = __webpack_require__; __webpack_require__.m = ");
        text = text.replace("index.html", "index.modified.html");
        return text;
    });

    patchFile("../dist/renderer/index.html", (text) => {
        text = text.replace("renderer.bundle.js", "renderer.bundle.patched.js");
        return text;
    });

    patchFile("../dist/renderer/renderer.bundle.js", (text) => {
        text = text.replace("var installedModules = {};", "global.installedModules = {}; global.modules = modules;");
        text = text.replace("__webpack_require__.e = ", "global.__webpack_require__ = __webpack_require__; __webpack_require__.e = ");
        text = 'require("../../pruritus/bootstrap.js").bootstrapRenderer();' + text + '\nrequire("./resources/app/pruritus/renderer.js")';
        return text;
    });

    return patchedMain;
}

function patchFile(fromPath: string, patcher: (text: string) => string): string {
    fromPath = path.join(__dirname, fromPath);
    const toPath = fromPath.replace(path.extname(fromPath), ".patched" + path.extname(fromPath));

    console.log("Patching: " + fromPath);
    let data = fs.readFileSync(fromPath, "utf8");
    data = patcher(data);

    console.log("Writing to: " + toPath);
    fs.writeFileSync(toPath, data, "utf8");

    return toPath;
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
