import Model, { Schema } from '../core/app.model'

export default class UserModel extends Model {
  constructor() {
    super({
      name: 'users',
      schema: new Schema({
        name: {
          type: String,
        },
      }),
    })
  }

  async getUserByName(name: string): Promise<any> {
    try {
      const userName = await this.model.findOne({ name })
      return userName
    } catch (err) {
      console.error(err)
    }
  }
}
