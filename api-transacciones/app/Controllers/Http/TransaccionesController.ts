import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { base64 } from '@ioc:Adonis/Core/Helpers'
import Database from '@ioc:Adonis/Lucid/Database'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import axios from 'axios'

const database =   Database.connection('mysql');


export default class TransaccionesController {

    public async test({response}: HttpContextContract){
        const report = await HealthCheck.getReport()
        return report.healthy ? response.ok(report) : response.badRequest(report)
    }

    public async index({response}: HttpContextContract){
        const controlCambios: Array<any>  = await database.rawQuery('SELECT * FROM `transacciones`');
        response.json(controlCambios)
    }


}
