import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { base64 } from '@ioc:Adonis/Core/Helpers'
import Database from '@ioc:Adonis/Lucid/Database'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { controlResponserutas } from 'App/services/controlResponserutas'

const database =   Database.connection('mysql');
const path_base = Env.get('RUTA_USUARIOS');

export default class UsuariosController {

  //estado de la api
    public async test({response}: HttpContextContract){
        const report = await HealthCheck.getReport()
        controlResponserutas(JSON.stringify(report.healthy ? response.ok(report) : response.badRequest(report)));
        return report.healthy ? response.ok(report) : response.badRequest(report)
    }

    //listado de usuarios
    public async index({response}: HttpContextContract){
        response.json({path_base})
        try {
            const { data } = await axios.get(
                path_base + `users`, { headers: { token: ''} }
            );
            controlResponserutas(base64.encode(JSON.stringify(data)))
            response.json(data);
          } catch (error) {
            controlResponserutas(base64.encode(JSON.stringify(error)))
            throw error
          }
    }
    
    //listado de albums
    public async albums({response}: HttpContextContract){
        response.json({path_base})
        try {
            const { data } = await axios.get(
                path_base + `albums`, { headers: { token: ''} }
            );
           await  controlResponserutas(base64.encode(JSON.stringify(data)))
            response.json(data);
          } catch (error) {
            controlResponserutas(JSON.stringify(error))
            throw error
          }
    }

    //listado de fotos
    public async photos({response}: HttpContextContract){
        response.json({path_base})
        try {
            const { data } = await axios.get(
                path_base + `photos`, { headers: { token: ''} }
            );
            controlResponserutas(base64.encode(JSON.stringify({data: 'la respuesta es demasiado larga para guaradarla pero se respondió correctamente'})))
            response.json(data);
          } catch (error) {
            controlResponserutas(JSON.stringify(error))
            throw error
          }
    }

}
