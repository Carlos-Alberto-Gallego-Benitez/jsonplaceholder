import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { base64 } from '@ioc:Adonis/Core/Helpers'
import Database from '@ioc:Adonis/Lucid/Database'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'

const database =   Database.connection('mysql');
const path_base = Env.get('RUTA_USUARIOS');

export default class UsuariosController {

    public async test({response}: HttpContextContract){
        const report = await HealthCheck.getReport()
        return report.healthy ? response.ok(report) : response.badRequest(report)
    }

    public async index({response}: HttpContextContract){
        response.json({path_base})
        try {
            const { data } = await axios.get(
                path_base + `posts`, { headers: { token: ''} }
            );
            response.json(data);
          } catch (error) {
            throw error
            response.json(error)
          }
    }

}
