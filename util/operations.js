const { exec } = require('child_process')
const os = require('os')

exports.tsDev = os => {
  process.env.NODE_ENV = 'dev'
  switch (os.platform()) {
    case 'win32':
      exec('start cmd.exe /K tsc --watch')
      exec('start cmd.exe /K nodemon lib')
      break
    case 'darwin':
      exec(
        `osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'`
      )
    case 'linux':
      exec('kconsole --noclose -e tsc --watch')
      break
    default:
      exec('echo UNKOWN OS')
      break
  }
}
exports.tsProd = os => {
  process.env.NODE_ENV = 'prod'
  switch (os.platform()) {
    case 'win32':
      exec('start cmd.exe /K tsc --watch')
      exec('start cmd.exe /K nodemon lib')
      break
    case 'darwin':
      exec(
        `osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'`
      )
    case 'linux':
      exec('kconsole --noclose -e tsc --watch')
      break
    default:
      exec('echo UNKOWN OS')
      break
  }
}

exports.tscStartCommand = (operation, mode) => {
  if (operation !== undefined) {
    console.error(
      'Invalid command: %s\nSee --help for a list of available commands.',
      operation
    )
    return
  }
  switch (mode) {
    case 'dev':
      this.tsDev(os)
      break
    case 'prod':
      this.tsProd(os)
      break
    default:
      console.error(
        'Invalid command: %s\nSee --help for a list of available commands.',
        operation
      )
      break
  }
}

exports.jsStartCommand = (operation, mode) => {
  if (operation !== undefined) {
    console.error(
      'Invalid command: %s\nSee --help for a list of available commands.',
      operation
    )
    return
  }
  switch (mode) {
    case 'dev':
      console.log('Hello JS')
      break
    case 'prod':
      prod(os)
      break
    default:
      console.error(
        'Invalid command: %s\nSee --help for a list of available commands.',
        operation
      )
      break
  }
}
