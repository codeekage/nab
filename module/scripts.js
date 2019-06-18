const fs = require("fs");
const { prompt } = require("inquirer");
const colors = require("colors");
const { execFile } = require("child_process");

exports.createNewApp = async (path, root) => {
  try {
    const readAppDir = fs.readdirSync(`${path}`, {
      encoding: "utf8",
      withFileTypes: true
    });
    fs.mkdirSync(`${root}`, { recursive: false });
    readAppDir.forEach(files => {
      if (files.isFile()) {
        const readFile = fs.readFileSync(`${path}/${files.name}`);
        fs.writeFileSync(`${root}/${files.name}`, readFile);
        console.info(colors.green("\u2714 Created"), `${root}/${files.name}`);
      }
    });
    prompt([
      {
        type: "confirm",
        name: "installPkg",
        message: "Do you like to install packages now?"
      }
    ]).then(ans => {
      if (ans.installPkg === true) {
        console.log(colors.green("\u231B Installing..."))
        execFile("npm", ["install"], {
            cwd: `./${root}`,
            shell: true
        }, (err, stdout, stderr) => {
          if (err) throw err;
          console.log(colors.blue("🖒 Done!"))
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
        });
      } else {
        console.log(colors.blue("🖒 Done!"))
        process.exit(1);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
