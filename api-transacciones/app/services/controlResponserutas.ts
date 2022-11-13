import { Response } from '@adonisjs/core/build/standalone';
import Database from '@ioc:Adonis/Lucid/Database'

const database =   Database.connection('mysql');

//función encargada de registrar las peticiones de cada ruta
export async function controlResponserutas(params) {
  let query = `UPDATE jsonplaceholder.transacciones SET respuesta_api = 'respuesta-api: ${params}' WHERE id = (SELECT max(id) id FROM transacciones)`;
  try {
    await database.rawQuery(query);
  } catch (error) {
    let query = `UPDATE jsonplaceholder.transacciones SET catch_respuesta = 'catch-error: ${error.code + ' - ' +error.sqlMessage.replace(/['"]+/g, '')}' WHERE id = (SELECT max(id) id FROM transacciones)`;
    await database.rawQuery(query);
    return error
  }
  return 'Ok'
}
