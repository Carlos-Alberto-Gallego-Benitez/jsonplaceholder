import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/test', 'UsuariosController.test')
  Route.get('/index', 'UsuariosController.index')
}).prefix('/api-usuarios')
