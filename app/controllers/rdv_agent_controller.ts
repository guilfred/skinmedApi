import Client from '#models/client'
import Rdv from '#models/rdv'
import { ROLE } from '#models/user'
import { RdvRepository } from '#repositories/rdv_repository'
import {
  createRdvInstallationValidator,
  UpdateCrenauAndStateAgentValidator,
  UpdateCreneauValidator,
} from '#validators/rdv_agent_validator'
import {
  CheckAgentIDToRdvsValidator,
  CheckRdvIDValidator,
  UpdateRdvAtValidator,
} from '#validators/rdv_client_validator'
import { updateStateValidator } from '#validators/security_validators'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { RdvDto } from '../dtos/rdv_dto.js'

@inject()
export default class RdvAgentController {
  constructor(
    protected presenter: RdvDto,
    protected repository: RdvRepository
  ) {}

  // liste de tous les rendez-vous des agents
  async index({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }

    const rdvs = await this.repository.getAllRdvsByAgent('contact')

    /* const rdvs =
      user.role === 'ROLE_SUPER_ADMIN'
        ? await this.repository.getAllRdvsByAgent('contact')
        : await this.repository.getRdvsFromCurrentUser(user.id, 'contact')
 */
    return rdvs.map((rdv) => this.presenter.toJSON(rdv))
  }

  async getRdvByCurrentAgent({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const rdvs = await this.repository.getRdvsByCurrentAgent(user.id)

    return rdvs.map((rdv) => this.presenter.toJSON(rdv))
  }

  async getRdvsByAgent({ auth, response, request }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }

    const { params } = await request.validateUsing(CheckAgentIDToRdvsValidator)

    const rdvs = await this.repository.getRdvsByAgentId(params.agentID)

    return rdvs.map((rdv) => this.presenter.toJSON(rdv))
  }

  async getRdvsAllAgent({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const rdvs = await this.repository.getRdvsAllAgents()

    return rdvs.map((rdv) => this.presenter.toJSON(rdv))
  }

  async editRdvByAgent({ auth, response, request }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }

    const { params } = await request.validateUsing(CheckRdvIDValidator)
    const rdv = await Rdv.query()
      .where('id', params.id)
      .whereHas('agent', (agentQuery) => {
        agentQuery.where('role', ROLE.AGENT) // on filtre directement l’agent
      })
      .preload('client')
      .preload('agent')
      .preload('user')
      .firstOrFail()
    const { isArchived, state } = await request.validateUsing(UpdateCrenauAndStateAgentValidator)
    rdv.isArchived = isArchived
    rdv.state = state
    await rdv.save()

    if (rdv.isArchived) {
      rdv.client.interested = false
      await rdv.client.save()
    }

    return response.status(200).json(this.presenter.toJSON(rdv))
  }

  // Créer un rendez - vous tout pour l'installation
  async createRdvInstallation({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { at, description, start, end, clientId } = await request.validateUsing(
      createRdvInstallationValidator
    )

    const client = await Client.findOrFail(clientId)
    // create rdv
    const rdvInstance = new Rdv()
    const dateAt = DateTime.fromJSDate(at)
    rdvInstance.rdvAt = dateAt
    rdvInstance.clientId = clientId
    rdvInstance.type = 'installation'
    rdvInstance.title = client.rs
    rdvInstance.description = description
    rdvInstance.start = start
    rdvInstance.end = end
    rdvInstance.agentId = user.id
    rdvInstance.userId = user.id
    await rdvInstance.save()

    await rdvInstance.load('client')
    await rdvInstance.load('user')
    await rdvInstance.load('agent')

    client.installAt = DateTime.fromJSDate(new Date())
    await client.save()

    return response.status(201).json(this.presenter.toJSON(rdvInstance))
  }

  async updateRdvInstallation({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(CheckRdvIDValidator)
    const rdv = await Rdv.query()
      .where('id', params.id)
      .preload('client')
      .preload('agent')
      .preload('user')
      .firstOrFail()
    const { at, description, start, end, clientId } = await request.validateUsing(
      createRdvInstallationValidator
    )

    await rdv
      .merge({
        rdvAt: DateTime.fromJSDate(at),
        description: description,
        start: start,
        end: end,
        clientId: clientId,
      })
      .save()

    const client = rdv.client
    client.installAt = DateTime.fromJSDate(new Date())
    await client.save()

    return response.status(200).json(this.presenter.toJSON(rdv))
  }

  // liste de rendez-vous par type installation
  async getListRdvInstallation({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const rdvs = await Rdv.query()
      .andWhere('agent_id', user.id)
      .preload('agent')
      .preload('user')
      .preload('client')

    return rdvs.map((rdv) => this.presenter.toJSON(rdv))
  }

  // Modifier le créneau et la date du rendez-vous client
  async editRdvAgentDateRdv({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(CheckRdvIDValidator)
    const rdv = await Rdv.query()
      .where('id', params.id)
      .preload('client')
      .preload('agent')
      .preload('user')
      .firstOrFail()

    const { rdvAt, start, end } = await request.validateUsing(UpdateRdvAtValidator)
    const dateAt = DateTime.fromJSDate(rdvAt)
    await rdv
      .merge({
        rdvAt: dateAt,
        start: start,
        end: end,
        title: `Rendez-vous d'installation pour le ${dateAt}`,
      })
      .save()

    return response.status(200).json(this.presenter.toJSON(rdv))
  }

  // Modifier l'agent et le créneau horaire du rendez-vous
  async editRdvCreneau({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(CheckRdvIDValidator)
    const rdv = await Rdv.query()
      .where('id', params.id)
      .preload('client')
      .preload('agent')
      .preload('user')
      .firstOrFail()

    const { start, end } = await request.validateUsing(UpdateCreneauValidator)
    await rdv.merge({ start: start, end: end }).save()

    return response.status(200).json(this.presenter.toJSON(rdv))
  }

  // Voir un seul rendez-vous
  async viewRdvAgentInstallation({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(CheckRdvIDValidator)
    const rdv = await Rdv.query()
      .where('id', params.id)
      .andWhere('type', 'installation')
      .preload('client')
      .preload('agent')
      .preload('user')
      .firstOrFail()

    return response.status(200).json(this.presenter.toJSON(rdv))
  }

  async updateStateRdv({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(CheckRdvIDValidator)
    const rdv = await Rdv.query()
      .where('id', params.id)
      .preload('client')
      .preload('agent')
      .preload('user')
      .firstOrFail()

    const { state } = await request.validateUsing(updateStateValidator)
    await rdv.merge({ state: state }).save()

    const client = rdv.client
    // si c'est un rendez-vous d'installation
    if (rdv.type === 'installation' && rdv.state) {
      client.signAt = rdv.rdvAt
      await client.save()
    }

    return response.status(200).json(this.presenter.toJSON(rdv))
  }
}
