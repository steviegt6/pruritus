import { bootstrapMain } from "@pruritus/bootstrap";
import { before, after, instead, unpatchAll } from "spitroast";

console.log(`Running in: ${__dirname}`);
bootstrapMain();
