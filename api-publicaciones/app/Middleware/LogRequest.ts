import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import { controlRutas } from 'App/services/controlRutas'
import { verify } from 'jsonwebtoken'
import { readFileSync } from 'fs'

export default class LogRequest {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    //mostramos las transacciones hechas, en la consola 
    let token = request.headers()['token'] as string

    let validate = false;

    if(!token){
      token = request.all().token as string
    }
    if(!token){//en caso de que el token no exista se devuelve la petición
      response.abort('error token invalido');
      return "Error token invalido"
    }

    //datos del registro de la url a registrar
    let date: Date = new Date();
    let fecha = date.getDate() + '-' + (parseInt(date.getMonth().toString()) + 1 ) + '-' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    let nombre = request.url().split('/')[1];

    //se valida el estado del token y se permite el paso a la api
    let publicKey = readFileSync('./public.key');  // get public key
    verify(token, publicKey, { algorithms: ['RS256']}, async (err, decoded) => {
      if(err){
        response.unauthorized({ message: `${err.message}` })
        validate = false;
      }else{
        request.headers().decoded = decoded;
       validate = true;
      }
    });

    //si el token se encuentra valido se autoriza el paso al endpoint
    if(validate){
      //se almacenan las rutas accedidas en la api
      controlRutas({method: request.method(), url: request.url(), fecha: fecha.toString(), nombre: nombre });
      Logger.info(`-> ${request.method()}: ${request.url()} datos: ${JSON.stringify({metohos: request.method(), url: request.url(), fecha: fecha.toString(), nombre: nombre })}`)
      await next()
      return
    }else{
      return "Error token invalido"
    }
  }
}
