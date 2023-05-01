import { join } from "path";
import { copyFileSync, existsSync, mkdirSync, readdirSync, rmdirSync } from "fs";
import { getApp } from "../util/findApp";
import Task from "./task";
import { getArgString } from "../util/parseArgs";

const DEFAULT_BUILD_DIR = join("dist", "pruritus");

export default class CopyTask implements Task {
    name: string = "copy";

    async run(): Promise<void> {
        console.log("Copying files...");
        console.log("Finding itch app location...");

        const appDir = getApp();
        const buildDir = getBuildDir();

        if (!appDir) {
            console.error("Could not find itch app location!");
            return;
        }

        const pruritusDir = join(appDir, "pruritus");

        console.log("Copying built pruritus files to itch app location...");
        if (existsSync(pruritusDir)) rmdirSync(pruritusDir, { recursive: true });
        mkdirSync(pruritusDir);
        copyDirSync(buildDir, pruritusDir);
        console.log("Copied built pruritus files to itch app location!");
    }
}

function copyDirSync(src: string, dest: string) {
    const entries = readdirSync(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = join(src, entry.name);
        const destPath = join(dest, entry.name);
        if (entry.isDirectory()) copyDirSync(srcPath, destPath);
        else {
            mkdirSync(dest, { recursive: true });
            copyFileSync(srcPath, destPath);
        }
    }
}

function getBuildDir(): string {
    const buildDir = getArgString("--build-dir") || DEFAULT_BUILD_DIR;
    if (!existsSync(buildDir)) throw new Error("Build directory does not exist!");
    return buildDir;
}
