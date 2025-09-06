import Client from '#models/client'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Financeur extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare libelle: string

  @column()
  declare address: string

  @column()
  declare cpInfo: string

  @column()
  declare article: string

  @column()
  declare amount: number

  @hasMany(() => Client, {
    foreignKey: 'financeurId',
  })
  declare clients: HasMany<typeof Client>
}
