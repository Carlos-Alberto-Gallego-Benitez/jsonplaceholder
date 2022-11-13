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
  Route.get('/test', 'UsuariosController.test')
  Route.get('/index', 'UsuariosController.index')
  Route.get('/albums', 'UsuariosController.albums')
  Route.get('/photos', 'UsuariosController.photos')
}).prefix('/api-usuarios').middleware('LogRequest')
