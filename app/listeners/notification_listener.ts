import { NotificationCreatedEvent } from '#events/notification_event'
import NotificationService from '#services/notification_service'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'
import transmit from '@adonisjs/transmit/services/main'

@inject()
export default class NotificationListener {
  constructor(
    protected logger: Logger,
    protected notificationService: NotificationService
  ) {}

  async onNotificationCreated({ ctx, title, content }: NotificationCreatedEvent) {
    const user = ctx.auth.user
    if (!user) return

    const notification = await this.notificationService.createNotification(user.id, title, content)
    transmit.broadcast(`notification/${user.id}/messages`, {
      title: notification.title,
      content: notification.content,
    })
    this.logger.info({ user: user }, `Notification de l'utilisateur :${title} !`)
  }
}
