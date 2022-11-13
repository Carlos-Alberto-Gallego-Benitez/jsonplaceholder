import Route from '@ioc:Adonis/Core/Route'
import Env from '@ioc:Adonis/Core/Env'
import { controlResponserutas } from 'App/services/controlResponserutas'

//grupo de rutas de la api
Route.group(() => {
  Route.get('/', async () => {
    let responseHome = {
      status: true,
      msg: 'Webservice success',
      api_name: Env.get('APP_TITLE'),
    };
    controlResponserutas(JSON.stringify(responseHome));
    return responseHome
  })
  Route.get('/test', 'TransaccionesController.test')
  Route.get('/index', 'TransaccionesController.index')
  Route.put('/update', 'TransaccionesController.update')
}).prefix('/api-transacciones').middleware('LogRequest')
