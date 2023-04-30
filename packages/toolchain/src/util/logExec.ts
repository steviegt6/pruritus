import { execSync } from "child_process";

export default function logExecSync(cmd: string) {
    try {
        const buf = execSync(cmd);
        console.log(buf.toString());
    } catch (e: any) {
        console.error(e.output[1].toString());
    }
}
