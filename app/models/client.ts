import Financeur from '#models/financeur'
import Rdv from '#models/rdv'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { attachments } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import { DateTime } from 'luxon'
import Avoir from './avoir.js'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @attachments({
    folder: (client: Client) => {
      const year = client.createdAt.year
      const month = client.createdAt.month.toString().padStart(2, '0')
      const safeName = client.rs.replace(/[^a-zA-Z0-9]/g, '_')

      return `uploads/client/${year}/${month}/${client.id}_${safeName}`
    },
  })
  declare files: Attachment[] | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare numBonCommande: string | null

  @column.dateTime()
  declare signAt: DateTime | null

  @column({ columnName: 'sign_ed' })
  declare signEd: boolean

  @column()
  declare name: string

  @column.dateTime()
  declare birthAt: DateTime | null

  @column()
  declare birthPlace: string | null

  @column()
  declare firstname: string

  @column()
  declare rs: string

  @column()
  declare siren: string | null

  @column()
  declare rpps: string | null

  @column()
  declare ville: string | null

  @column()
  declare matricule: string | null

  @column()
  declare codePostal: string | null

  @column()
  declare de: string | null

  @column()
  declare fsp: string | null

  @column()
  declare department: string

  @column()
  declare address: string | null

  @column()
  declare email: string | null

  @column()
  declare phoneFix: string | null

  @column()
  declare phonePortable: string | null

  @column()
  declare amount: number | null

  @column.dateTime()
  declare installAt: DateTime | null

  @column()
  declare eSign: boolean | null

  @column()
  declare interested: boolean

  @column()
  declare financeurId: number | null

  constructor() {
    super()
    this.signEd = false
  }

  @belongsTo(() => Financeur)
  declare financeur: BelongsTo<typeof Financeur>

  @hasMany(() => Rdv, {
    foreignKey: 'clientId',
  })
  declare rdvs: HasMany<typeof Rdv>

  @hasMany(() => Avoir, {
    foreignKey: 'clientId',
  })
  declare avoirs: HasMany<typeof Avoir>
}
