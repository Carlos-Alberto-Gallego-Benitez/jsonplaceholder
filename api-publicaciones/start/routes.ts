import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/test', 'PublicacionesController.test')
  Route.get('/index', 'PublicacionesController.index')
}).prefix('/api-publicaciones')