import bootstrap from "bootstrap";

console.log(`Running in: ${__dirname}`);
bootstrap();

const env = require("@itch/common/env");
console.log(env.appName);
