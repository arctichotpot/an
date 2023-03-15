import { program } from "commander";

export const name = "hello";

export const command = program.command(name)
  .description("Say hello")
  .arguments("<name>")
  .action((name: string) => {
    console.log(`Hello, ${name}!`);
  });
