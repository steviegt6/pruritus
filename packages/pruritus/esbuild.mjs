import { build } from "esbuild";

build({
    entryPoints: ["src/index.ts"],
    outdir: "../../dist/pruritus/",
    sourcemap: "external",
    platform: "node",
    bundle: true,
    minify: true,
    loader: {},
    plugins: [],
    alias: {
        "@itch": "kitch/src"
    },
    external: ["kitch"]
});
