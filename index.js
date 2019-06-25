#!/usr/bin/env node
const commander = require('commander')
const { tscStartCommand } = require('./util/operations')
//const { prompt } = require('inquirer')
const {
  createNewTypeScriptApp,
  createController,
  createModel
} = require('./module')
//commander object
const program = new commander.Command()

/* const question = [
  {
    type: 'list',
    name: 'appType',
    choices: ['Typescript', 'Javascript'],
    message: 'Select Project Type',
  },
] */

//cli details
program
  .version('0.0.1')
  .name('nab')
  .description('CLI Node.js Appl Builder [Typescript/Javascript]')

// error on unknown commands
program.on('command:*', () => {
  console.error(
    'Invalid command: %s\nSee --help for a list of available commands.',
    program.args.join(' ')
  )
  process.exit(1)
})

//CMD: add new project command
/* program
  .command('new <app-name>')
  .alias('n')
  .description('create a new typescript nodejs application')
  .action((appName, options) => {
    prompt(question).then(answers => {
      switch (answers.appType) {
        case 'Javascript':
          createNewJavaScriptApp(appName)
          break
        case 'Typescript':
          createNewTypeScriptApp(appName)
          break
        default:
          break
      }
    })
  })
  .on('--help', () => {
    console.log('')
    console.log('Examples:')
    console.log('  $ nab new my-awesome-project')
    console.log('  $ nab n my-awesome-project')
    console.log(' or See: $ nab create --help')
  }) */

//CMD: create new project command
program
  .command('create [app-name]')
  .alias('c')
  .description('create a new typescript nodejs application')
  .option('-t, --typescript [app-name]', 'Which setup mode to use')
  .action((operation, options) => {
    const { typescript } = options
    if (operation !== undefined) {
      console.error(
        'Invalid command: %s\nSee --help for a list of available commands.',
        operation
      )
      return
    }
    if (typescript !== undefined && typescript !== true) {
      createNewTypeScriptApp(typescript)
      return
    }
    console.error(
      'Invalid command: %s\nSee --help for a list of available commands.',
      operation
    )
  })
  .on('--help', () => {
    console.log('')
    console.log('Examples:')
    console.log('  $ nab create --typescript my-awesome-project')
    console.log('  $ nab create -t my-awesome-project')
  })

//CMD: start project
program
  .command('start [operation]')
  .alias('s')
  .description('start dev server')
  .option('-t, --typescript [operation]', 'typescript dev server')
  .action((operation, options) => {
    const { typescript } = options
    if (typescript) {
      tscStartCommand(operation, typescript)
      return
    }
  })
  .on('--help', () => {
    console.log('')
    console.log('Examples:')
    console.log('  $ nab start --typescript dev')
  })

program
  .command('add <operation>')
  .alias('a')
  .description('add either a controller or a model to your web api')
  .option('-t, --typescript <filename>', 'Which setup mode to use')
  .action((operation, options) => {
    const { typescript } = options
    if (typescript && operation === 'controller') {
      createController('./', typescript)
      return
    }

    if (typescript && operation === 'model') {
      createModel('./', typescript)
      return
    }
  })
  .on('--help', () => {
    console.log('')
    console.log('Examples:')
    console.log('  $ nab add model -t <model-name> | nab add model --typescript <model-name>')
    console.log('  $ nab add controller -t <controller> | nab add controller -typesctipt <controller>')
  })

program.parse(process.argv)
