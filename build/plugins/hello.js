"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = exports.name = void 0;
const commander_1 = require("commander");
exports.name = "hello";
exports.command = commander_1.program.command(exports.name)
    .description("Say hello")
    .arguments("<name>")
    .action((name) => {
    console.log(`Hello, ${name}!`);
});
