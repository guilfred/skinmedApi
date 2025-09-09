import Avoir from '#models/avoir'
import Client from '#models/client'
import User from '#models/user'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export type RdvType = 'contact' | 'installation'

export default class Rdv extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime()
  declare rdvAt: DateTime

  @column()
  declare creneau: string | null

  @column({ columnName: 'client_id' })
  declare clientId: number

  @column({ columnName: 'agent_id' })
  declare agentId: number

  @column({ columnName: 'user_id' })
  declare userId: number

  @column()
  declare state: boolean

  @column()
  declare isArchived: boolean

  @column()
  declare type: RdvType

  @column()
  declare description: string | null

  @column()
  declare title: string

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'agentId' })
  declare agent: BelongsTo<typeof User>

  @hasMany(() => Avoir, {
    foreignKey: 'rdvId',
  })
  declare avoirs: HasMany<typeof Avoir>

  constructor() {
    super()
    this.state = false
    this.isArchived = false
  }
}
