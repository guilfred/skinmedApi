import Notification from '#models/notification'
import {
  NotificationIDValidator,
  NotificationUserIDValidator,
} from '#validators/notification_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { NotificationDto } from '../dtos/notification_dto.js'

@inject()
export default class NotificationController {
  constructor(protected presenter: NotificationDto) {}

  async index({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }

    const { params } = await request.validateUsing(NotificationUserIDValidator)
    const notifications = await Notification.query().where('receiver_user_id', params.userId)

    return notifications.map((notification) => this.presenter.toJSON(notification))
  }

  async updateNotificationAfterReading({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }

    const { params } = await request.validateUsing(NotificationIDValidator)
    const notification = await Notification.findOrFail(params.id)
    notification.readAt = DateTime.fromJSDate(new Date())
    await notification.save()

    return this.presenter.toJSON(notification)
  }
}
