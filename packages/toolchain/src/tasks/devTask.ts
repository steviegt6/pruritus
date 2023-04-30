import BuildTask from "./buildTask";
import CopyTask from "./copyTask";
import InjectTask from "./injectTask";
import RunTask from "./runTask";
import Task, { execTask } from "./task";

export default class DevTask implements Task {
    name: string = "dev";

    async run(): Promise<void> {
        await execTask(new BuildTask());
        await execTask(new CopyTask());
        await execTask(new InjectTask());
        await execTask(new RunTask());
    }
}
