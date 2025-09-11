import { CreateClientEvent, RdvCreatedEvent } from '#events/user_activity_event'
import Client from '#models/client'
import Rdv from '#models/rdv'
import { ROLE } from '#models/user'
import { RdvRepository } from '#repositories/rdv_repository'
import {
  CheckRdvIDValidator,
  createRdvFromClientAgentAttachValidator,
  GetAgentByTypeValidator,
  UpdateCrenauAndProfileAgentValidator,
  UpdateRdvAtValidator,
} from '#validators/rdv_client_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { RdvDto } from '../dtos/rdv_dto.js'

@inject()
export default class RdvClientController {
  constructor(
    protected presenter: RdvDto,
    protected repository: RdvRepository
  ) {}

  // liste de rendez-vous par type contact|installation
  async index({ auth, response, request }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { type } = await request.validateUsing(GetAgentByTypeValidator)
    const rdvs = await Rdv.query()
      .where('type', type)
      .andWhere('isArchived', false)
      .whereHas('agent', (agentQuery) => {
        agentQuery.where('role', ROLE.AGENT) // on filtre directement l’agent
      })
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
      .whereHas('agent', (agentQuery) => {
        agentQuery.where('role', ROLE.AGENT) // on filtre directement l’agent
      })
      .preload('client')
      .preload('agent')
      .preload('user')
      .firstOrFail()

    const { rdvAt, creneau } = await request.validateUsing(UpdateRdvAtValidator)
    if (!rdv.state) {
      await rdv.merge({ rdvAt: DateTime.fromJSDate(rdvAt), creneau: creneau }).save()
    }

    return response.status(200).json(this.presenter.toJSON(rdv))
  }

  // Modifier l'agent et le créneau horaire du rendez-vous
  async editRdvCreneauAndProfileAgentAndStateToClient({ auth, request, response }: HttpContext) {
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

    const { agentId, creneau, isArchived } = await request.validateUsing(
      UpdateCrenauAndProfileAgentValidator
    )
    await rdv.merge({ creneau: creneau, agentId: agentId, isArchived: isArchived }).save()

    if (rdv.isArchived) {
      const client = await Client.query()
        .whereHas('rdvs', (rdvQuery) => {
          rdvQuery.where('id', rdv.id)
        })
        .firstOrFail()
      client.interested = false
      await client.save()
    }

    return response.status(200).json(this.presenter.toJSON(rdv))
  }

  // Voir un seul rendez-vous
  async viewRdvClient({ auth, request, response }: HttpContext) {
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

    return response.status(200).json(this.presenter.toJSON(rdv))
  }

  // Créer un rendez - vous tout en ajoutant un client
  async createRdvFromClientAndAgentAttach({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { client, rdv, agentId } = await request.validateUsing(
      createRdvFromClientAgentAttachValidator
    )

    // create client
    const clientInstance = new Client()
    clientInstance.name = client.name
    clientInstance.firstname = client.firstname
    clientInstance.rs = client.rs
    clientInstance.codePostal = client.cp
    clientInstance.department = client.department
    clientInstance.phonePortable = client.phonePortable
    clientInstance.phoneFix = client.phoneFix
    clientInstance.address = client.address
    clientInstance.ville = client.ville
    clientInstance.email = client.email
    clientInstance.interested = client.interested
    await clientInstance.save()

    CreateClientEvent.dispatch({ request, response, auth } as HttpContext, clientInstance)

    // create rdv
    const rdvInstance = new Rdv()
    rdvInstance.rdvAt = DateTime.fromJSDate(rdv.at)
    rdvInstance.clientId = clientInstance.id
    rdvInstance.type = 'contact'
    rdvInstance.title = rdv.title
    rdvInstance.description = rdv.description
    rdvInstance.creneau = rdv.creneau
    rdvInstance.agentId = agentId
    rdvInstance.userId = user.id
    await rdvInstance.save()

    await rdvInstance.load('client')
    await rdvInstance.load('user')
    await rdvInstance.load('agent')

    RdvCreatedEvent.dispatch({ request, response, auth } as HttpContext, rdvInstance)

    return response.status(201).json(this.presenter.toJSON(rdvInstance))
  }
}
