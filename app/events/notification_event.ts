import { BaseEvent } from '@adonisjs/core/events'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * Événements Notification
 */
export class NotificationCreatedEvent extends BaseEvent {
  constructor(
    public ctx: HttpContext,
    public title: string,
    public content: string
  ) {
    super()
  }
}
