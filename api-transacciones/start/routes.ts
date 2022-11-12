import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/test', 'TransaccionesController.test')
  Route.get('/index', 'TransaccionesController.index')
}).prefix('/api-transacciones')
