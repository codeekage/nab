import * as express from 'express'
import * as dotenv from 'dotenv'
import AppConfig, { IConfig } from './core'
import UsersController from './controller/Users.controller'

//use environment varibales
dotenv.config()

const app: IConfig = new AppConfig({
  port: 5000,
  server: express(),
  message: 'Application Running!',
  logger: true,
  //mongodb: process.env.MONGO_URI || 'mongodb://localhost:27017/olive',
})
app.get('/:name', new UsersController().greetUserWithName)
app.get('/', new UsersController().greetUser)

console.log(process.env.NODE_ENV)
