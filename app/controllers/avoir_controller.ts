import { formatLibelle, getTotalAvoir } from '#features/utils'
import Avoir from '#models/avoir'
import {
  createAvoirValidator,
  getAvoirIDValidator,
  getClientIDFromAvoirValidator,
  updateAvoirValidator,
} from '#validators/avoir_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { AvoirDto } from '../dtos/avoir_dto.js'

@inject()
export default class AvoirController {
  constructor(protected presenter: AvoirDto) {}

  async getAvoirsByClient({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(getClientIDFromAvoirValidator)
    const avoirs = await Avoir.query()
      .whereHas('client', (clientQuery) => {
        return clientQuery.where('id', params.clientId)
      })
      .preload('client')

    return avoirs.map((a: Avoir) => this.presenter.toJSON(a))
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { qte, clientId, tva, libelle, at, unit_price } =
      await request.validateUsing(createAvoirValidator)

    const avoir = new Avoir()
    avoir.qteBilled = qte > 22 ? 22 : qte
    avoir.qteRealized = qte
    avoir.unitPrice = unit_price
    avoir.clientId = clientId
    avoir.libelle = formatLibelle(libelle, new Date(at))
    avoir.tva = tva
    avoir.at = DateTime.fromJSDate(at)
    avoir.total = getTotalAvoir(qte)
    await avoir.save()
    await avoir.load('client')

    return response.status(201).json(this.presenter.toJSON(avoir))
  }

  async edit({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(getAvoirIDValidator)
    const avoir = await Avoir.query().where('id', params.id).preload('client').firstOrFail()

    const { qte, tva, libelle, at, unit_price } = await request.validateUsing(updateAvoirValidator)
    avoir.qteBilled = qte > 22 ? 22 : qte
    avoir.qteRealized = qte
    avoir.unitPrice = unit_price
    avoir.libelle = formatLibelle(libelle, new Date(at))
    avoir.tva = tva
    avoir.at = DateTime.fromJSDate(at)
    avoir.total = getTotalAvoir(qte)
    await avoir.save()
    await avoir.load('client')

    return response.status(200).json(this.presenter.toJSON(avoir))
  }

  async view({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(getAvoirIDValidator)
    const avoir = await Avoir.query().where('id', params.id).preload('client').firstOrFail()

    return response.status(200).json(this.presenter.toJSON(avoir))
  }

  async destroy({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(getAvoirIDValidator)
    const avoir = await Avoir.findOrFail(params.id)
    await avoir.delete()

    return response.status(200).send("Suppression de l'avoir")
  }
}
