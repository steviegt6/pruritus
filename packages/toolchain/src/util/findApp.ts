// Paths and some resolution logic taken from https://github.com/replugged-org/replugged/tree/main/scripts/inject/

import { execSync } from "child_process";
import { existsSync, readdirSync } from "fs";
import { join } from "path";
import getPlatform from "./platform";

// grep instances of LOGNAME in /etc/passwd, pipe output to cut, cut line by ":" and get the 6th field
// example grep output: name:x:1000:1000:,,,:/home/name:/bin/bash
//                                           ^^^^^^^^^^ we want this
const HOME_DIR = process.platform === "linux" ? execSync('grep $(logname) /etc/passwd | cut -d ":" -f6').toString().trim() : "";
const FLATPAK_DIR = "/var/lib/flatpak/app/io.itch";
const HOME_FLATPAK_DIR = `${HOME_DIR}/.local/share/flatpak/app/io.itch`;

const SEARCH_DIRECTORIES = {
    win32: [winPath("itch")],
    darwin: ["/Applications/itch.app/Contents"],
    linux: ["/usr/share/itch", "/usr/lib64/itch", "/opt/itch", `${FLATPAK_DIR}.Discord/current/active/files/discord`, `${HOME_FLATPAK_DIR}.Discord/current/active/files/discord`, `${HOME_DIR}/.local/bin/Discord`]
};

const SEARCH_FUNCTIONS = {
    win32: (dir: string) => {
        if (!existsSync(dir)) return undefined;
        const discordDirectory = readdirSync(dir);
        const currentBuild = discordDirectory.filter((x) => x.startsWith("app-")).reverse()[0];
        dir = join(dir, currentBuild);
        return existsSync(dir) ? dir : undefined;
    },
    darwin: (dir: string) => {
        return existsSync(dir) ? dir : undefined;
    },
    linux: (dir: string) => {
        return existsSync(dir) ? dir : undefined;
    }
};

const APPEND_PATH_FUNCTIONS = {
    win32: (dir: string) => join(dir, "Resources", "app"),
    darwin: (dir: string) => dir,
    linux: (dir: string) => join(dir, "resources", "app")
};

function winPath(dir: string) {
    return join(process.env.LOCALAPPDATA || "", dir);
}

export function getDir() {
    for (const dir of SEARCH_DIRECTORIES[getPlatform()]) {
        const result = SEARCH_FUNCTIONS[getPlatform()](dir);
        if (result) return result;
    }

    return undefined;
}

export function getApp() {
    let dir = getDir();
    if (!dir) return undefined;
    dir = APPEND_PATH_FUNCTIONS[getPlatform()](dir);
    return existsSync(dir || "") ? dir : undefined;
}
