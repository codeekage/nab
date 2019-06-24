import { Response, Request, NextFunction } from 'express'
import UserModel from '../model/users.model'

const user = new UserModel()
export default class UsersController {
  greetUser(req: Request, res: Response): void {
    res.send({
      body: 'Hello World',
    })
  }

  greetUserWithName(req: Request, res: Response, next : NextFunction): void {
    user
      .getUserByName(req.params.name)
      .then(result =>
        !result
          ? res.send(`User Not Found`)
          : res.send(`<h1>Hello ${result.name}</h1>`)
      )
      .catch(err => next(err))
  }
}
