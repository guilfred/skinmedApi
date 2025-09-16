import Client from '#models/client'
import {
  AddClientValidator,
  CheckClientIDValidator,
  choiceLeaseurValidator,
  EditClientContratDataValidator,
  EditPreClientValidator,
  scanFilesClientValidator,
} from '#validators/client_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { attachmentManager } from '@jrmc/adonis-attachment'
import { DateTime } from 'luxon'
import { ClientDto } from '../dtos/client_dto.js'

@inject()
export default class ClientController {
  constructor(protected presenter: ClientDto) {}

  async getClients({ response, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }

    if (user.role === 'ROLE_AGENT') {
      const clients = await Client.query()
        .whereHas('rdvs', (rdvQuery) => {
          rdvQuery.where('agentId', user.id)
        })
        .preload('rdvs', (rdvQuery) => {
          rdvQuery.where('agentId', user.id).preload('agent') // ✅ AJOUT IMPORTANT : charge l'agent
        })
        .preload('financeur')

      return clients.map((c: Client) => this.presenter.toJSON(c))
    }

    const clients = await Client.all()

    return clients.map((c: Client) => this.presenter.toJSON(c))
  }

  async view({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(CheckClientIDValidator)
    const c = await Client.query()
      .where('id', params.id)
      .preload('financeur')
      .preload('rdvs', (rdvsQuery) => {
        rdvsQuery
          .where('agentId', user.id) // ✅ Filtre par agent connecté
          .preload('agent') // Charge l'agent de chaque RDV
      })
      .firstOrFail()

    return response.status(200).json(this.presenter.toJSON(c))
  }

  async editContract({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(CheckClientIDValidator)

    const client = await Client.query().where('id', params.id).firstOrFail()

    const {
      siren,
      rpps,
      amount,
      numBonCommande,
      signAt,
      installAt,
      eSign,
      financeurId,
      matricule,
      de,
      fsp,
    } = await request.validateUsing(EditClientContratDataValidator)

    await client
      .merge({
        siren,
        rpps,
        amount,
        de,
        fsp,
        numBonCommande,
        signAt: signAt ? DateTime.fromJSDate(signAt) : null,
        installAt: installAt ? DateTime.fromJSDate(installAt) : null,
        eSign: eSign === null ? null : eSign,
        financeurId,
        matricule,
      })
      .save()

    await client.refresh()

    return response.status(200).json(this.presenter.toJSON(client))
  }

  async editClientInformation({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(CheckClientIDValidator)

    const client = await Client.query().where('id', params.id).firstOrFail()

    const {
      nom,
      firstname,
      rs,
      ville,
      address,
      phoneFix,
      phonePortable,
      email,
      codePostal,
      birthPlace,
      birthAt,
      department,
    } = await request.validateUsing(EditPreClientValidator)

    await client
      .merge({
        name: nom,
        firstname,
        rs,
        department,
        ville,
        address,
        phoneFix,
        phonePortable,
        email,
        codePostal: codePostal ?? null,
        birthAt: birthAt ? DateTime.fromJSDate(birthAt) : null,
        birthPlace,
      })
      .save()

    await client.refresh()

    return response.status(200).json(this.presenter.toJSON(client))
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const {
      name,
      firstname,
      email,
      ville,
      address,
      codePostal,
      phoneFix,
      phonePortable,
      interested,
      department,
      rs,
    } = await request.validateUsing(AddClientValidator)

    const client = new Client()
    client.name = name
    client.firstname = firstname
    client.email = email
    client.ville = ville
    client.address = address
    client.codePostal = codePostal ?? null
    client.phoneFix = phoneFix
    client.phonePortable = phonePortable
    client.interested = interested
    client.department = department
    client.rs = rs
    await client.save()

    return response.status(201).json(this.presenter.toJSON(client))
  }

  async scanFiles({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(CheckClientIDValidator)
    const client = await Client.findOrFail(params.id)

    const { files } = await request.validateUsing(scanFilesClientValidator)
    client.files = await attachmentManager.createFromFiles(files)
    await client.save()

    return response.status(200).json(this.presenter.toJSON(client))
  }

  async choiceLeaseur({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(CheckClientIDValidator)
    const client = await Client.query().where('id', params.id).firstOrFail()
    const { financeurId, esign } = await request.validateUsing(choiceLeaseurValidator)
    client.eSign = esign
    client.financeurId = financeurId
    await client.save()

    return response.status(200).json(this.presenter.toJSON(client))
  }
}
