const fs = require("fs");

console.log("Deleting old build...");
fs.rmdirSync("../../dist/pruritus", { recursive: true });
