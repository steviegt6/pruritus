import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { getApp } from "../util/findApp";
import Task from "./task";

export default class InjectTask implements Task {
    name: string = "inject";

    async run(): Promise<void> {
        console.log("Injecting...");

        const appDir = getApp();

        if (!appDir) {
            console.error("Could not find itch app location!");
            return;
        }

        console.log("Got itch app location: " + appDir);
        console.log("Injecting pruritus...");

        modifyPackageJson(appDir);
    }
}

function modifyPackageJson(path: string) {
    const packageJsonPath = join(path, "package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath).toString());
    packageJson.main = "pruritus/index.js";
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));
}
