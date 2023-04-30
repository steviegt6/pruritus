import { build } from "esbuild";

build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outdir: "../../dist/pruritus/",
    sourcemap: "external",
    minify: true,
    loader: {},
    plugins: [],
    platform: "node",
    alias: {
        "@itch": "../node_modules/kitch/src/*"
    }
});
