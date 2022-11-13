import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'

Route.group(() => {
  Route.get('/', async () => {
    return {
      status: true,
      msg: 'Webservice success',
      api_name: Env.get('APP_TITLE'),
    }
  })
  Route.get('/test', 'TransaccionesController.test')
  Route.get('/index', 'TransaccionesController.index')
}).prefix('/api-transacciones').middleware('LogRequest')
