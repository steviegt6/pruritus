const fs = require("fs");
const path = require("path");
const { transformFileSync } = require("@swc/core");

const mainPackage = require("./package.json");
console.log(mainPackage.dependencies);

const foundDeps = [];
resolveDeps(mainPackage.dependencies);

function resolveDeps(deps) {
    console.log("Resolving dependencies...", deps);

    for (const dep in deps) {
        if (foundDeps.includes(dep)) continue;
        const depPackage = require("./node_modules/" + dep + "/package.json");

        console.log("Copying " + dep + "...");
        let depPath = "./node_modules/" + dep;
        const depDest = "../../dist/pruritus/node_modules/" + dep;

        if (depPackage.module) {
            depPath = path.join(depPath, path.dirname(depPackage.module));
            console.log(`Auto-detected real root from module ("${depPath}"): ` + depPackage.module);
        } else if (depPackage.main) {
            depPath = path.join(depPath, path.dirname(depPackage.main));
            console.log(`Auto-detected real root from main ("${depPath}"): ` + depPackage.main);
        }

        foundDeps.push({ name: dep, path: depPath, dest: depDest });
        resolveDeps(depPackage.dependencies);

        //fs.mkdirSync(depDest, { recursive: true });
        //copyDirSync(depPath, depDest);
    }
}

// transpile all found deps with swc
for (const dep of foundDeps) {
    console.log("Transpiling " + dep.name + "... (to " + dep.dest + ")");

    transformDirSync(dep.path, dep.dest);
}

function transformDirSync(src, dest) {
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) transformDirSync(srcPath, destPath);
        else {
            fs.mkdirSync(dest, { recursive: true });
            const output = transformFileSync(srcPath.replaceAll("\\", "/"), {
                outputPath: destPath,
                configFile: "./deps.swcrc"
            });
            fs.writeFileSync(destPath, output.code);
            fs.writeFileSync(destPath + ".map", output.map);
        }
    }
}
