import * as supertest from 'supertest'
import * as express from 'express'
import UsersController from '../controller/Users.controller'

const initApp = () => {
  const app = express()
  app.get('/', new UsersController().greetUser)
  app.get('/:name', new UsersController().greetUserWithName)
  return app
}

describe('GET /', () => {
  test('should return responses', async () => {
    const app = initApp()
    const res = await supertest(app).get('/')
    expect(res.body).toEqual({
      body: 'Hello World',
    })
  })

  test('should respond with name', async () => {
    const app = initApp()
    const res = await supertest(app).get('/:name')
        expect(res.body).toEqual(`Hello :name`)
  })
})
