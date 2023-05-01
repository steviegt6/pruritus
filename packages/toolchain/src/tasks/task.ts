import BuildTask from "./buildTask";
import CopyTask from "./copyTask";
import DevTask from "./devTask";
import InjectTask from "./injectTask";
import InstallTask from "./installTask";
import RunTask from "./runTask";

export default interface Task {
    readonly name: string;

    run(): Promise<void>;
}

export const TASKS: Task[] = [
    new BuildTask(),
    new CopyTask(),
    new DevTask(),
    new InjectTask(),
    new InstallTask(),
    new RunTask(false)
];

export async function execTask(task: Task) {
    await task.run();
}
