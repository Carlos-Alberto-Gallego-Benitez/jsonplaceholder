import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { base64 } from '@ioc:Adonis/Core/Helpers'
import Database from '@ioc:Adonis/Lucid/Database'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { controlResponserutas } from 'App/services/controlResponserutas'

const database =   Database.connection('mysql');
const path_base = Env.get('RUTA_PUBLICACIONES');

export default class PublicacionesController {

    //estado de la api
    public async test({response}: HttpContextContract){
        const report = await HealthCheck.getReport()
        controlResponserutas(JSON.stringify(report.healthy ? response.ok(report) : response.badRequest(report)))
        return report.healthy ? response.ok(report) : response.badRequest(report)
    }

    //listdo de publicaciones
    public async index({response}: HttpContextContract){
        response.json({path_base})
        try {
            const { data } = await axios.get(
                path_base + `posts`, { headers: { token: ''} }
            );
            controlResponserutas(base64.encode(JSON.stringify(data)))
            response.json(data);
          } catch (error) {
            controlResponserutas(JSON.stringify(base64.encode(error)))
            throw error
          }
    }

}
