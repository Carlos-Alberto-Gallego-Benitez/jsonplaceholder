import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { base64 } from '@ioc:Adonis/Core/Helpers'
import Database from '@ioc:Adonis/Lucid/Database'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { controlResponserutas } from 'App/services/controlResponserutas'
import { verify, sign } from 'jsonwebtoken'
import { readFileSync } from 'fs'

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

       //listado de usuarios filtrado
       public async searchUser({response, request}: HttpContextContract){
        let { id } = request.all();
        try {
            const { data } = await axios.get(
                path_base + `users/${id}`, { headers: { token: ''} }
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

    public async gerateToken({response}: HttpContextContract){
      let salida;
      var privateKey = readFileSync('./private.key');
      var token = sign({ data: 'bar', exp: Math.floor(Date.now() / 1000) + (15 * 15) }, privateKey, { algorithm: 'RS256'});
      var publicKey = readFileSync('./public.key');  // get public key
      verify(token, publicKey, { algorithms: ['RS256']}, (err, decoded) => {
        salida = {decod: decoded, token: token}
      });
      controlResponserutas(base64.encode(JSON.stringify({data: 'ok'})))
      response.json(salida)
    }

    public async verify({response, request}: HttpContextContract){
      let salida;
      let { token } = request.all();
      var privateKey = readFileSync('./private.key');
     // var token = sign({ data: 'bar', exp: Math.floor(Date.now() / 1000) + (15 * 15) }, privateKey, { algorithm: 'RS256'});
      var publicKey = readFileSync('./public.key');  // get public key
      verify(token, publicKey, { algorithms: ['RS256']}, (err, decoded) => {
        salida = {decod: decoded, token: token, errr: err}
      });
      controlResponserutas(base64.encode(JSON.stringify({data: 'ok'})))
      response.json(salida)
    }

}
