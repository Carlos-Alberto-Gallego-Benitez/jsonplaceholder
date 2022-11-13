import Database from '@ioc:Adonis/Lucid/Database'

const database =   Database.connection('mysql');

//función encargada de registrar las peticiones de cada ruta
export async function controlRutas(nombreParametro) {
  let query = `INSERT INTO jsonplaceholder.transacciones (url, nombre, fecha, metodo) VALUES('http://127.0.0.1:8341${nombreParametro.url}', '${nombreParametro.nombre}', '${nombreParametro.fecha}', '${nombreParametro.method}')`
  try {
    await database.rawQuery(query);
  } catch (error) {
    throw error
  }

  return 'Ok'
}
