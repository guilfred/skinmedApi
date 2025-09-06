import Client from '#models/client'
import Rdv from '#models/rdv'
import { BaseEvent } from '@adonisjs/core/events'
import type { HttpContext } from '@adonisjs/core/http'

export class CreateClientEvent extends BaseEvent {
  constructor(
    public ctx: HttpContext,
    public client: Client
  ) {
    super()
  }
}

/**
 * Événements RDV
 */
export class RdvCreatedEvent extends BaseEvent {
  constructor(
    public ctx: HttpContext,
    public rdv: Rdv
  ) {
    super()
  }
}
