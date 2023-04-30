import path from "path";

const main = path.join(__dirname, "../dist/main/main.bundle.js");

console.log("Running in: " + __dirname);
console.log("Running: " + main);

require(main);
