const fs = require("fs");

console.log("Deleting old build...");
if (fs.existsSync("../../dist/pruritus")) fs.rmdirSync("../../dist/pruritus", { recursive: true });
