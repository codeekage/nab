const fs = require('fs')
const colors = require('colors')


const controller = filename => `
import { Response, Request, NextFunction } from 'express'

export default class ${filename}Controller {
  greet${filename}(req: Request, res: Response, next : NextFunction): void {
    res.send('${filename}Controller Created ')
    next()
  }
}`

const model = (filename) => `
import Model, { Schema } from '../core/app.model'
export default class ${filename}Model extends Model {
  constructor() {
    super({
      name: '${filename.toLowerCase()}',
      schema: new Schema({
        name: {
          type: String,
        },
      }),
    })
  }
}
`

exports.createController = (root, filename) => {
  try {
    const controllerName = filename.charAt(0).toUpperCase() + filename.slice(1)
    fs.writeFileSync(
      `${root}/src/controller/${controllerName}.controller.ts`,
      `${controller(controllerName)} `,
      {
        encoding: 'utf8',
      }
    )
    console.info(
      colors.green('\u2714 Created'),
      `controller/${controllerName}.controller.ts`
    )
  } catch (err) {
    throw new Error(err)
  }
}

exports.createModel = (root, filename) => {
  try {
    const modelName = filename.charAt(0).toUpperCase() + filename.slice(1)
    fs.writeFileSync(
      `${root}/src/model/${modelName}.model.ts`,
      `${model(modelName)} `,
      {
        encoding: 'utf8',
      }
    )
    console.info(
      colors.green('\u2714 Created'),
      `model/${modelName}.model.ts`
    )
  } catch (err) {
    throw new Error(err)
  }
}
