import type { HttpContext } from '@adonisjs/core/http'

export default class LogoutController {
  async logout({ auth, response, session }: HttpContext) {
    await auth.use('api').logout()
    session.clear()

    return response.status(200).json({ message: 'Deconnection du CRM !' })
  }
}
