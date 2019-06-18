#!/usr/bin/env node
const commander = require("commander");
const { prompt } = require("inquirer");
const { createNewJavaScriptApp, createNewTypeScriptApp } = require("./module");
//commander object
const program = new commander.Command();

const question = [
  {
    type: "list",
    name: "appType",
    choices: ["Typescript", "Javascript"],
    message: "Select Project Type"
  }
];

program
  .version("0.0.1")
  .name("nab")
  .description("CLI Node.js Appl Builder [Typescript/Javascript]");

// error on unknown commands
program.on("command:*", function() {
  console.error(
    "Invalid command: %s\nSee --help for a list of available commands.",
    program.args.join(" ")
  );
  process.exit(1);
});

program
  .command("new <app-name>")
  .alias("n")
  .description("create a new nodejs application")
  .action((appName, options) => {
    prompt(question).then(answers => {
      switch (answers.appType) {
        case "Javascript":
          createNewJavaScriptApp(appName);
          break;
        case "Typescript":
          createNewTypeScriptApp(appName);
          break;
        default:
          break;
      }
    });
  });

program.option("-j, --javascript <app-name>", "float argument");
program.option("-t, --typescript <app-name>", "float argument");
program.parse(process.argv);

if (program.javascript !== undefined) {
  createNewJavaScriptApp(program.javascript)
}
if (program.typescript !== undefined)
  createNewTypeScriptApp(program.typescript);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
