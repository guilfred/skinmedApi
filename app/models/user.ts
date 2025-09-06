import UserActivity from '#models/user_activity'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { attachment } from '@jrmc/adonis-attachment'
import type { Attachment } from '@jrmc/adonis-attachment/types/attachment'
import { DateTime } from 'luxon'
import Rdv from './rdv.js'
import TimeSlot from './time_slot.js'

const AuthFinder = withAuthFinder(() => hash.use('argon'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export const ROLE = {
  SUPER_ADMIN: 'ROLE_SUPER_ADMIN',
  ADMIN: 'ROLE_ADMIN',
  TELE_ADMIN: 'ROLE_TELE_ADMIN',
  USER: 'ROLE_USER',
  AGENT: 'ROLE_AGENT',
  TELE_VENDEUR: 'ROLE_TELE_VENDEUR',
} as const

export type ROLE = (typeof ROLE)[keyof typeof ROLE]

export const RoleHierarchy: Record<ROLE, ROLE[]> = {} as any

Object.assign(RoleHierarchy, {
  [ROLE.SUPER_ADMIN]: [ROLE.ADMIN, ROLE.AGENT, ROLE.USER, ROLE.TELE_VENDEUR, ROLE.TELE_ADMIN],
  [ROLE.ADMIN]: [ROLE.AGENT, ROLE.USER],
  [ROLE.TELE_ADMIN]: [ROLE.TELE_VENDEUR],
  [ROLE.AGENT]: [],
  [ROLE.USER]: [],
  [ROLE.TELE_VENDEUR]: [],
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @attachment()
  declare avatar: Attachment | null

  @column.dateTime({ columnName: 'last_login_at' })
  declare lastLoginAt: DateTime | null

  @column()
  declare email: string

  @column()
  declare name: string

  @column()
  declare firstname: string

  @column()
  declare phone: string | null

  @column()
  declare description: string | null

  @column()
  declare ville: string | null

  @column()
  declare codePostal: string | null

  @column()
  declare address: string | null

  @column({ columnName: 'is_enabled' })
  declare isEnabled: boolean

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare role: ROLE

  @hasMany(() => UserActivity)
  declare activities: HasMany<typeof UserActivity>

  @hasMany(() => Rdv)
  declare rdvs: HasMany<typeof Rdv>

  @hasMany(() => TimeSlot)
  declare timeSlots: HasMany<typeof TimeSlot>

  constructor() {
    super()
    this.isEnabled = true
  }

  canAccess(requiredRole: ROLE): boolean {
    if (this.role === requiredRole) return true
    return RoleHierarchy[this.role]?.includes(requiredRole) ?? false
  }
}
