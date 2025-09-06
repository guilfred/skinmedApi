import User, { ROLE } from '#models/user'
import { CheckAgentIDValidator } from '#validators/agent_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { UserDto } from '../dtos/user_dto.js'

@inject()
export default class AgentController {
  constructor(protected presenter: UserDto) {}

  async index({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const agents = await User.query().where('role', ROLE.AGENT)

    return agents.map((a) => this.presenter.toJSON(a))
  }

  async getAgent({ auth, response, request }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(CheckAgentIDValidator)
    const agent = await User.query()
      .where('role', ROLE.AGENT)
      .andWhere('id', params.id)
      .firstOrFail()

    return response.status(200).json(this.presenter.toJSON(agent))
  }
}
