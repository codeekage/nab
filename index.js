#!/usr/bin/env node
const commander = require('commander')
const { tscStartCommand, jsStartCommand } = require('./util/operations')
const { prompt } = require('inquirer')
const { createNewJavaScriptApp, createNewTypeScriptApp } = require('./module')
//commander object
const program = new commander.Command()

const question = [
  {
    type: 'list',
    name: 'appType',
    choices: ['Typescript', 'Javascript'],
    message: 'Select Project Type',
  },
]

program
  .version('0.0.1')
  .name('nab')
  .description('CLI Node.js Appl Builder [Typescript/Javascript]')

// error on unknown commands
program.on('command:*', function() {
  console.error(
    'Invalid command: %s\nSee --help for a list of available commands.',
    program.args.join(' ')
  )
  process.exit(1)
})

program
  .command('new <app-name>')
  .alias('n')
  .description('create a new nodejs application')
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
  }).on('--help', () => {
    console.log('')
    console.log('Examples:')
    console.log('  $ nab new my-awesome-project')
    console.log('  $ nab n my-awesome-project')
  })

program
  .command('start [operation]')
  .alias('s')
  .description('run setup commands for all envs')
  .option('-t, --typescript [operation]', 'Which setup mode to use')
  .option('-j, --javascript [operation]', 'Which setup mode to use')
  .action((operation, options) => {
    const { typescript, javascript } = options
    if (javascript) {
      jsStartCommand(operation, javascript)
      return
    }
    if (typescript) {
      tscStartCommand(operation, typescript)
      return
    }
  })
  .on('--help', () => {
    console.log('')
    console.log('Examples:')
    console.log('  $ nab start --tsc server')
    console.log('  $ nab start --node server')
  })

program
  .command('create [app-name]')
  .alias('c')
  .description('run setup commands for all envs')
  .option('-t, --typescript [app-name]', 'Which setup mode to use')
  .option('-j, --javascript [app-name]', 'Which setup mode to use')
  .action((operation, options) => {
    const { javascript, typescript } = options
    if (operation !== undefined) {
      console.error(
        'Invalid command: %s\nSee --help for a list of available commands.',
        operation
      )
      return
    }
    if (javascript !== undefined && javascript !== true) {
      createNewJavaScriptApp(javascript)
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
    console.log('  $ nab create --javascript my-awesome-project')
    console.log('  $ nab create -j my-awesome-project')
    console.log('  $ nab create --typescript my-awesome-project')
    console.log('  $ nab create -t my-awesome-project')
  })
program.parse(process.argv)
