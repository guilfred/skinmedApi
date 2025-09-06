import Client from '#models/client'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User from './user.js'

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

  constructor() {
    super()
    this.state = false
    this.isArchived = false
  }
}
