import UserActivity from '#models/user_activity'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'

@inject()
export default class ActivityService {
  constructor(protected logger: Logger) {}
  /**
   * Helper pour créer une activité
   */
  async createActivity(
    userId: number,
    action: string,
    description: string,
    ipAddress?: string
  ): Promise<void> {
    try {
      const activity = new UserActivity()
      activity.userId = userId
      activity.action = action
      activity.description = description
      activity.ipAddress = ipAddress
      await activity.save()
    } catch (error) {
      this.logger.error({ err: Error }, `Failed to log activity [${action}]:`)
    }
  }
}
