import Client from '#models/client'
import Rdv from '#models/rdv'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class Avoir extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'qte_billed' })
  declare qteBilled: number

  @column({ columnName: 'qte_realized' })
  declare qteRealized: number

  @column({ columnName: 'client_id' })
  declare clientId: number

  @column({ columnName: 'rdv_id' })
  declare rdvId: number

  @column({ columnName: 'tva' })
  declare tva: number

  @column({ columnName: 'unit_price' })
  declare unitPrice: number

  @column()
  declare total: number

  @column({ columnName: 'libelle' })
  declare libelle: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime()
  declare at: DateTime

  @belongsTo(() => Client, { foreignKey: 'clientId' })
  declare client: BelongsTo<typeof Client>

  @belongsTo(() => Rdv, { foreignKey: 'rdvId' })
  declare rdv: BelongsTo<typeof Rdv>
}
