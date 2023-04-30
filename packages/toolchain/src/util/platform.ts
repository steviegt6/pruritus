type Platform = "win32" | "darwin" | "linux";

let platform: Platform | undefined;

export default function getPlatform(): Platform {
    if (platform) return platform;

    switch (process.platform) {
        case "win32":
            return (platform = "win32");
        case "darwin":
            return (platform = "darwin");
        case "linux":
            return (platform = "linux");
        default:
            throw new Error("Unknown platform: " + process.platform);
    }
}
