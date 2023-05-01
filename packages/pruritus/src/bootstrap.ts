import path from "path";
import fs from "fs";

export function bootstrapMain(relativeToApp: string) {
    console.log("Bootstrapping main...");

    console.log("Patching `require`...");
    patchRequire(relativeToApp);

    console.log("Patching bundles...");
    const main = patchBundles();

    require(main);
}

export function bootstrapRenderer(relativeToApp: string) {
    console.log("Bootstrapping renderer...");

    console.log("Patching `require`...");
    patchRequire(relativeToApp);
}

function patchBundles() {
    // mainData = mainData.replace("module.exports =", "global.whatthefuckisthis = module.exports =");
    // rendererData = rendererData.replace("module.exports =", "global.whatthefuckisthis = module.exports =");

    const patchedMain = patchFile("../dist/main/main.bundle.js", (text) => {
        text = text.replace("var installedModules = {};", "global.installedModules = {}; global.modules = modules;");
        text = text.replace(
            "__webpack_require__.m = ",
            "global.__webpack_require__ = __webpack_require__; __webpack_require__.m = "
        );
        text = text.replace("index.html", "index.modified.html");
        return text;
    });

    patchFile("../dist/renderer/index.html", (text) => {
        text = text.replace("renderer.bundle.js", "renderer.bundle.patched.js");
        return text;
    });

    patchFile("../dist/renderer/renderer.bundle.js", (text) => {
        text = text.replace("var installedModules = {};", "global.installedModules = {}; global.modules = modules;");
        text = text.replace(
            "__webpack_require__.e = ",
            "global.__webpack_require__ = __webpack_require__; __webpack_require__.e = "
        );
        text =
            'require("../../pruritus/bootstrap.js").bootstrapRenderer("../");' +
            text +
            '\nrequire("@pruritus/renderer")';
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

type Alias = {
    root: string;
    webpack: boolean;
    extension: string;
};

const requireAliases: { [k: string]: Alias } = {
    "@itch/": { root: "./src/", webpack: true, extension: ".ts" },
    "@itch-modules/": { root: "./node_modules/", webpack: true, extension: ".js" },
    "@pruritus/": { root: "./pruritus/", webpack: false, extension: ".js" },
    "@spitroast": { root: "./pruritus/node_modules/spitroast/index.js", webpack: false, extension: "" }
};

function patchRequire(relativeToApp: string) {
    const Module = require("module");
    const oldRequire = Module.prototype.require;
    const appRoot = path.join(__dirname, relativeToApp);
    console.log("require patched in __dirname, appRoot: " + __dirname + ", " + appRoot);
    Module.prototype.require = Object.assign(
        (id: string) => {
            for (const [alias, { root, webpack, extension }] of Object.entries(requireAliases)) {
                let isDir = false;
                if (alias.endsWith("/") && id.startsWith(alias)) isDir = true;
                else if (!alias.endsWith("/") && id === alias) isDir = false;
                else continue;

                console.log("Resolving as alias '" + alias + "': " + id);

                let name = isDir ? root + id.substring(alias.length) : root;
                // add ext if missing
                if (isDir && !path.extname(name) && !name.endsWith(extension)) name += extension;
                else if (isDir && path.extname(name))
                    name = name.substring(0, name.length - path.extname(name).length) + extension;

                if (webpack) {
                    console.log("Resolving webpack module: " + name);
                    return resolveExports(global.__webpack_require__(name));
                } else {
                    console.log("Resolving module: " + appRoot + name);
                    return oldRequire(appRoot + name);
                }
            }

            try {
                console.log("Attempting to resolve as built-in: " + id);
                return oldRequire(id);
            } catch {
                id = path.isAbsolute(id) ? id : path.join(appRoot, id);
                console.log("Failed, resolving as absolute non-alias: " + id);
                return oldRequire(id);
            }
        },
        {
            ...oldRequire
        }
    );
    console.log(require);
}

function resolveExports(module: any): any {
    // TODO: Resolve Webpack module exports; lots of work to do.
    return module;
}
