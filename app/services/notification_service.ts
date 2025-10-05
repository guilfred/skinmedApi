import Notification from '#models/notification'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'

@inject()
export default class NotificationService {
  constructor(protected logger: Logger) {}
  /**
   * Helper pour créer une activité
   */
  async createNotification(userId: number, title: string, content: string): Promise<Notification> {
    try {
      const notification = new Notification()
      notification.receiverUserId = userId
      notification.title = title
      notification.content = content
      await notification.save()

      return notification
    } catch (error) {
      this.logger.error({ err: Error }, `Failed to log notification [${title}]:`)
      throw error
    }
  }
}
