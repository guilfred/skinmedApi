import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import User from './user.js'

export default class TimeSlot extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare startTime: string

  @column()
  declare endTime: string

  @column.dateTime()
  declare dateAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column({ columnName: 'user_id' })
  declare userId: number

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>
}
