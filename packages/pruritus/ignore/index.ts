import { findByDisplayName, findByProps, findAsync } from "@cumjar/websmack";

import { Package as _Package, PackageLike as _PackageLike, EnsureOpts as _EnsureOpts, UpgradeOpts as _UpgradeOpts } from "@itch/main/broth/package";
import { SelfPackage as _SelfPackage } from "@itch/main/broth/self-package";
import { actions as _actions } from "@itch/common/actions";
import { Store as _Store } from "@itch/common/types";
import * as _manager from "@itch/main/broth/manager";
import * as _env from "@itch/common/env";
const { Package }: { Package: typeof _Package } = findByProps("Package", "PackageLike", "EnsureOpts", "UpgradeOpts");
const { SelfPackage }: { SelfPackage: typeof _SelfPackage } = findByProps("SelfPackage");
const { actions }: { actions: typeof _actions } = findByProps("actions");
const manager: typeof _manager = findByProps("Manager");
const env: typeof _env = findByProps("appName");

import path from "path";
import { app } from "electron";

const main = path.join(__dirname, "../dist/main/main.bundle.js");

console.log(`Running "${env.appName}" in: ${__dirname}`);
console.log("Running: " + main);

console.log("hijacking");
hijackBrothManager();

require(main);

function hijackBrothManager() {
    const regularPackageNames = ["butler", "itch-setup", "pruritus"];
    const packageNames = [env.appName, ...regularPackageNames];

    class PruritusManager {
        private prefix: string;
        pkgs: _PackageLike[] = [];

        constructor(store: _Store) {
            this.prefix = path.join(app.getPath("userData"), "broth");

            store.dispatch(actions.packagesListed({ packageNames }));
            this.pkgs.push(new SelfPackage(store, env.appName));
            for (const name of regularPackageNames) this.pkgs.push(new Package(store, this.prefix, name));
        }

        async ensure(opts: _EnsureOpts) {
            for (const pkg of this.pkgs) await pkg.ensure(opts);
        }

        async upgrade(opts: _UpgradeOpts) {
            for (const pkg of this.pkgs) await pkg.upgrade(opts);
        }
    }

    const managerPath = require.resolve("common/broth/manager");
    if (require.cache[managerPath] !== undefined) {
        delete require.cache[managerPath];
        require.cache[managerPath]!.exports = {
            ...manager,
            Manager: PruritusManager
        };
    }
}

/*
describeFormula("test", {
    sanityCheck: async (ctx, logger, versionPrefix) => {
        
    },
    transformChannel: (channel) => {
        return channel;
    },
    getSemvarConstraint: () => {
        return "*";
    },
});
*/
