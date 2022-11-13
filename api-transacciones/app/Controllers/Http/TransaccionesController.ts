import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { base64 } from '@ioc:Adonis/Core/Helpers'
import Database from '@ioc:Adonis/Lucid/Database'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import axios from 'axios'
import { controlResponserutas } from 'App/services/controlResponserutas'

const database =   Database.connection('mysql');


export default class TransaccionesController {

    //estado de la api
    public async test({response}: HttpContextContract){
        const report = await HealthCheck.getReport();
        controlResponserutas(JSON.stringify(report.healthy ? response.ok(report) : response.badRequest(report)))
        return report.healthy ? response.ok(report) : response.badRequest(report)
    }

    //listado de peticiones
    public async index({response}: HttpContextContract){
        try {
            const controlCambios = await database.rawQuery('SELECT * FROM `transacciones`');
            controlResponserutas(base64.encode(JSON.stringify({data: 'la respuesta es demasiado larga para guaradarla pero se respondió correctamente'})))
            response.json(controlCambios)
        } catch (error) {
            controlResponserutas(base64.encode(JSON.stringify(error)))
            throw error
        }
        
    }
    
    //actualizar petición
    public async update({response, request}: HttpContextContract){
        let { query } = request.all();
        query = JSON.parse(base64.decode(query));
        try {
            let sql = `UPDATE jsonplaceholder.transacciones SET url='${query.url}', nombre='${query.nombre}', fecha='${query.fecha}', metodo='${query.metodo}', respuesta_api='${query.respuesta}', catch_respuesta='${query.catch}' WHERE id = ${parseInt(query.id)}`;
            const controlCambios = await database.rawQuery(sql);
            controlResponserutas(base64.encode(JSON.stringify({data: 'Ok'})))
            response.json('Ok')
        } catch (error) {
            controlResponserutas(base64.encode(JSON.stringify(error)))
            throw error
        }
    }   

    //eliminar petición
    public async delete({response, request}: HttpContextContract){
        let { query } = request.all();
        query = JSON.parse(base64.decode(query));
        try {
            let sql = `DELETE FROM jsonplaceholder.transacciones WHERE id = ${parseInt(query.id)}`
            const controlCambios = await database.rawQuery(sql);
            controlResponserutas(base64.encode(JSON.stringify({data: 'Ok'})))
            response.json('Ok')
        } catch (error) {
            controlResponserutas(base64.encode(JSON.stringify(error)))
            throw error
        }
    } 

}
