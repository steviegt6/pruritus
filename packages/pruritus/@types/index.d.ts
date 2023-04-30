/**
 * Indexer for `globalThis.installedModules` and `globalThis.modules`.
 * Integers are used while indexing for the bundle entrypoint, strings are used as paths for actual modules.
 */
export type ModuleKey = string | number;

/**
 * Module exports.
 */
export type ModuleExports = any;
export type Module = {
    /**
     * The module's name.
     */
    i: string;

    /**
     * Whether this module has been loaded.
     */
    l: boolean;

    /**
     * This module's exports.
     */
    exports: ModuleExports;
};

/**
 * Webpack module require function.
 */
export type WebpackModuleRequire = (moduleId: ModuleKey) => Module;

/**
 * Webpack module resolver.
 */
export type WebpackModuleResolver = (module: any, __module_exports__: any, __module_require__: WebpackModuleRequire) => void;

declare global {
    /**
     * Webpack modules which have been resolved and installed.
     */
    var installedModules: { [k in ModuleKey]: Module };

    /**
     * All resolvable webpack modules.
     */
    var modules: { [k in ModuleKey]: WebpackModuleResolver };

    /**
     * Webpack module require function, which resolves Webpack modules.
     */
    var __webpack_require__: WebpackModuleRequire;
}
