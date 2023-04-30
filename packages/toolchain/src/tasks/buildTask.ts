import logExecSync from "../util/logExec";
import Task from "./task";

export default class BuildTask implements Task {
    name: string = "build";

    async run(): Promise<void> {
        console.log("Building...");
        logExecSync("npm run build");
    }
}
