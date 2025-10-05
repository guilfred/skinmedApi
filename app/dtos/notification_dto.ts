import Notification from '#models/notification'

export class NotificationDto {
  toJSON(n: Notification) {
    return {
      id: n.id,
      title: n.title,
      content: n.content,
      createdAt: n.createdAt,
      readAt: n.readAt ?? null,
    }
  }
}
