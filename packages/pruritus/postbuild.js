const fs = require("fs");
const path = require("path");

const mainPackage = require("./package.json");
console.log(mainPackage.dependencies);

const copiedDeps = [];
copyDeps(mainPackage.dependencies);

function copyDeps(deps) {
    console.log("Copying dependencies...", deps);

    for (const dep in deps) {
        if (copiedDeps.includes(dep)) continue;
        copiedDeps.push(dep);
        const depPackage = require("./node_modules/" + dep + "/package.json");
        copyDeps(depPackage.dependencies);

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

        fs.mkdirSync(depDest, { recursive: true });
        copyDirSync(depPath, depDest);
    }
}

function copyDirSync(src, dest) {
    const entries = fs.readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) copyDirSync(srcPath, destPath);
        else {
            fs.mkdirSync(path.dirname(destPath), { recursive: true });
            fs.copyFileSync(srcPath, destPath);
        }
    }
}
