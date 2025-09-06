import Financeur from '#models/financeur'
import {
  CheckFinanceurIDValidator,
  UpdateFinanceurValidator,
} from '#validators/financeur_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { FinanceurDto } from '../dtos/financeur_dto.js'

@inject()
export default class FinanceurController {
  constructor(protected presenter: FinanceurDto) {}

  async index({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const financeurs = await Financeur.all()

    return financeurs.map((financeur) => this.presenter.toJSON(financeur))
  }

  async store({ request, response, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { libelle, address, cpInfo, article, amount } =
      await request.validateUsing(UpdateFinanceurValidator)
    const financeur = new Financeur()
    financeur.libelle = libelle
    financeur.address = address
    financeur.cpInfo = cpInfo
    financeur.article = article
    financeur.amount = amount

    await financeur.save()
    await financeur.load('clients')

    return response.status(201).json(this.presenter.toJSON(financeur))
  }

  async edit({ request, response, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(CheckFinanceurIDValidator)

    const financeur = await Financeur.query()
      .where('id', params.id)
      .preload('clients')
      .firstOrFail()

    const { libelle, address, cpInfo, article, amount } =
      await request.validateUsing(UpdateFinanceurValidator)

    financeur.libelle = libelle
    financeur.address = address
    financeur.cpInfo = cpInfo
    financeur.article = article
    financeur.amount = amount

    await financeur.save()

    return response.status(200).json(this.presenter.toJSON(financeur))
  }

  async view({ request, response, auth }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { params } = await request.validateUsing(CheckFinanceurIDValidator)

    const financeur = await Financeur.query()
      .where('id', params.id)
      .preload('clients')
      .firstOrFail()

    return response.status(200).json(this.presenter.toJSON(financeur))
  }
}
