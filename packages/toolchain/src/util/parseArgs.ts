export function getArgString(arg: string): string | undefined {
    const i = process.argv.indexOf(arg);
    if (i === -1) return undefined;
    return process.argv[i + 1];
}
