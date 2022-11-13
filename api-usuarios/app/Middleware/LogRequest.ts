import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'

export default class LogRequest {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
   

    //mostramos las transacciones hechas, en la consola 
    Logger.info(`-> ${request.method()}: ${request.url()}`)

    await next()
  }
}
