import * as mongoose from 'mongoose'

type ModelOption = {
  name: string
  schema: mongoose.Schema
  collection?: string
}

export default class Model {
  model: any
  constructor(model: ModelOption) {
    const { name, schema, collection } = model
    this.model = mongoose.model(name, schema)
    if (collection) {
      this.model = mongoose.model(name, schema, collection)
    }
  }
}

export const Schema = mongoose.Schema
