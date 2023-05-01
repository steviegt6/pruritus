// DO NOT use @pruritus/bootstrap; our require patch is not yet applied!
import { bootstrapMain } from "./bootstrap";

console.log(`Running in: ${__dirname}`);
bootstrapMain("../");
