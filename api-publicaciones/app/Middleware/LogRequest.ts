import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'
import { controlRutas } from 'App/services/controlRutas'

export default class LogRequest {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    //mostramos las transacciones hechas, en la consola 

    let date: Date = new Date();
    let fecha = date.getDate() + '-' + (parseInt(date.getMonth().toString()) + 1 ) + '-' + date.getFullYear() + ' - ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    let nombre = request.url().split('/')[1];
    controlRutas({method: request.method(), url: request.url(), fecha: fecha.toString(), nombre: nombre });
    Logger.info(`-> ${request.method()}: ${request.url()} datos: ${JSON.stringify({metohos: request.method(), url: request.url(), fecha: fecha.toString(), nombre: nombre })}`)
    await next()
  }
}
