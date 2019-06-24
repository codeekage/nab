const fs = require('fs')
const { prompt } = require('inquirer')
const colors = require('colors')
const { execFile } = require('child_process')

exports.createNewApp = async (path, root) => {
  try {
    const readAppDir = fs.readdirSync(`${path}`, {
      encoding: 'utf8',
      withFileTypes: true,
    })
    fs.mkdir(`${root}`, { recursive: false }, () => {
      readAppDir.forEach(files => {
        //when read is Files
        if (files.isFile()) {
          const readFile = fs.readFileSync(`${path}/${files.name}`)
          fs.writeFileSync(`${root}/${files.name}`, readFile)
          console.info(colors.green('\u2714 Created'), `${root}/${files.name}`)
        }
        //when reads are directories
        if (files.isDirectory()) {
          const readDir = fs.readdirSync(`${path}/${files.name}`, {
            encoding: 'utf8',
            withFileTypes: true,
          })
          const folders = []
          readDir.map(innerDir => {
            if (innerDir.isFile()) {
              fs.mkdirSync(`${root}/${files.name}`)
              const readFile = fs.readFileSync(
                `${path}/${files.name}/${innerDir.name}`
              )
              fs.writeFileSync(
                `${root}/${files.name}/${innerDir.name}`,
                readFile
              )
              console.info(
                colors.green('\u2714 Created'),
                `${root}/${files.name}/${innerDir.name}`
              )
            }
            if (innerDir.isDirectory()) {
              folders.push(innerDir.name)
            }
          })
          if (folders.length > 0)
            folders.map(item => {
              fs.mkdirSync(`${root}/${files.name}/${item}`)
              const readInnerFolders = fs.readdirSync(
                `${path}/${files.name}/${item}`
              )
              readInnerFolders.map(inFile => {
                const readInFile = fs.readFileSync(
                  `${path}/${files.name}/${item}/${inFile}`
                )
                fs.writeFileSync(
                  `${root}/${files.name}/${item}/${inFile}`,
                  readInFile
                )
                console.info(
                  colors.green('\u2714 Created'),
                  `${root}/${files.name}/${item}/${inFile}`
                )
              })
            })
            return
        }
      })
      prompt([
        {
          type: 'confirm',
          name: 'installPkg',
          message: 'Do you like to install packages now?',
        },
      ]).then(ans => {
        if (ans.installPkg === true) {
          console.log(colors.green('\u231B Installing...'))
          execFile(
            'npm',
            ['install'],
            {
              cwd: `./${root}`,
              shell: true,
            },
            (err, stdout, stderr) => {
              if (err) throw err
              console.log(colors.blue('🖒 Done!'))
              console.log(`stdout: ${stdout}`)
              console.log(`stderr: ${stderr}`)
            }
          )
        } else {
          console.log(colors.blue('🖒 Done!'))
          process.exit(1)
        }
      })
    })
  } catch (error) {
    console.log(error)
  }
}
