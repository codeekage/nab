import Configuration from './app.config'

type Server = {
  port: any
  message: string
  server: any
  logger?: boolean
  mongodb?: string
}

export interface IConfig {
  get(path: string, Controller: Object): void
  post(path: string, Controller: Object): void
  put(path: string, Controller: Object): void
  delete(path: string, Controller: Object): void
}

export default class AppConfig extends Configuration {
  constructor(serverOption: Server) {
    super(serverOption)
  }

  get(path: string, Controller: Object) {
    this.server.get(path, Controller)
  }

  post(path: string, Controller: Object) {
    this.server.post(path, Controller)
  }

  put(path: string, Controller: Object) {
    this.server.put(path, Controller)
  }

  delete(path: string, Controller: Object) {
    this.server.delete(path, Controller)
  }

  getServerObject() {
    return this.server
  }
}
