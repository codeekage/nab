import * as morgan from 'morgan'
import * as uuid from 'uuid'
import * as fs from 'fs'
import * as mongoose from 'mongoose'

type Server = {
  port: any
  message: string
  server: any
  logger?: boolean
  mongodb?: string
}

type Controller = {
  listen: Function
  get: Function
  put: Function
  post: Function
  delete: Function
  use: Function
}

export default class Configuration {
  server: Controller
  constructor(serverOption: Server) {
    const { port, server, message, logger, mongodb } = serverOption
    this.server = server
    this.server.listen(this.normalizePort(process.env.PORT || port), () => console.log(message, port))
    if (logger) {
      this.morganLogger()
    }
    if (mongodb) {
      this.mongoDBConnect(mongodb)
    }

  }

  assignId(req: any, res: any, next: any) {
    req.id = uuid.v4()
    next()
  }

  async mongoDBConnect(uri: string) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
      })
      console.log(`Connected with ${uri}`)
    } catch (err) {
      console.error(err)
    }
  }

   normalizePort(val :any) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }

  morganLogger() {
    this.server.use(this.assignId)
    this.server.use(morgan('dev'))
    // log all requests to access.log
    this.server.use(
      morgan('combined', {
        stream: fs.createWriteStream('./debug.log', {
          flags: 'a',
        }),
      })
    )
  }
}
