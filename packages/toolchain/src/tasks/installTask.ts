import BuildTask from "./buildTask";
import CopyTask from "./copyTask";
import InjectTask from "./injectTask";
import RunTask from "./runTask";
import Task, { execTask } from "./task";

export default class InstallTask implements Task {
    name: string = "install";

    async run(): Promise<void> {
        console.log("Installing pruritus!");

        await execTask(new BuildTask());
        await execTask(new CopyTask());
        await execTask(new InjectTask());
        await execTask(new RunTask());
    }
}
