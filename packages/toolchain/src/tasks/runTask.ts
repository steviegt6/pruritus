import { readdirSync } from "fs";
import { join } from "path";
import { getDir } from "../util/findApp";
import Task from "./task";
import getPlatform from "../util/platform";
import prompts from "prompts";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";

const PLATFORM_RUNNERS = {
    win32: (dir: string) => {
        const itchDir = readdirSync(dir);
        const executable = join(dir, itchDir.filter((x) => x.endsWith(".exe"))[0]);
        console.log("Running: " + executable);
        logAndWait(spawn(`"${executable}"`, [], { shell: true, detached: true }));
    },
    darwin: (_dir: string) => {
        console.log("Contribute macOS support @ https://github.com/steviegt6/pruritus");
    },
    linux: (dir: string) => {
        const itchDir = readdirSync(dir);
        const executable = join(dir, itchDir.filter((x) => x.toLowerCase().startsWith("itch") && !x.endsWith(".desktop") && !x.endsWith(".png"))[0]);
        console.log("Running: " + executable);
        logAndWait(spawn(executable, { shell: true, detached: true }));
    }
};

function logAndWait(proc: ChildProcessWithoutNullStreams) {
    proc.stdout.on("data", (data) => console.log(data.toString()));
    proc.stderr.on("data", (data) => console.error(data.toString()));
    proc.on("close", (code) => {
        if (code) console.error(`Process exited with code ${code}`);
        else console.log("Process exited successfully");
    });
}

export default class RunTask implements Task {
    name: string = "run";

    async run(): Promise<void> {
        console.log("Finding itch install location...");

        let itchDir = getDir();
        if (!itchDir) {
            console.log("Could not find itch install location!");
            itchDir = (
                await prompts({
                    type: "text",
                    name: "itchDir",
                    message: "Please enter the location of your itch install:",
                    validate: (value) => {
                        if (readdirSync(value).filter((x) => x.toLowerCase().startsWith("itch")).length > 0) return true;
                        else return "Could not find itch executable in that directory!";
                    }
                })
            ).itchDir;
        }

        console.log("Running itch...");
        console.log("Using directory: " + itchDir);
        PLATFORM_RUNNERS[getPlatform()](itchDir!);
    }
}
