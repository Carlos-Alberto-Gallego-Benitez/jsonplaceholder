import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/test', 'UsoSuelosController.test')
}).prefix('/api-usuarios')
