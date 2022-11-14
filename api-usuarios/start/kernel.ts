
import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([() => import('@ioc:Adonis/Core/BodyParser'),])

Server.middleware.registerNamed({ LogRequest: () => import('App/Middleware/LogRequest') })

const globalMiddleware = [
    'Adonis/Middleware/AuthInit'
  ]
  
  const namedMiddleware = {
    auth: 'Adonis/Middleware/Auth',
    guest: 'Adonis/Middleware/AllowGuestOnly'
  }