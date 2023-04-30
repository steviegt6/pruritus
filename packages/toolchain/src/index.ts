import prompts from "prompts";
import { TASKS } from "./tasks/task";

(async () => {
    console.log("pruritus toolchain");
    console.log("Process args: ", process.argv);

    const taskName = process.argv[2] || (await promptTask());
    const task = TASKS.find((task) => task.name === taskName);
    if (!task) throw new Error(`Task ${taskName} not found`);

    console.log(`Running task ${task.name}`);
    await task.run();
})();

async function promptTask() {
    return (
        await prompts({
            type: "select",
            name: "task",
            message: "No task specified - please select a task to run",
            choices: TASKS.map((task) => ({ title: task.name, value: task.name }))
        })
    ).task;
}
