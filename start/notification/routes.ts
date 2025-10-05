import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const NotificationController = () => import('#controllers/notification_controller')

export const NotificationRoutes = () => {
  router
    .group(() => {
      router.get('/:userId', [NotificationController, 'index'])
      router.put('/:id', [NotificationController, 'updateNotificationAfterReading'])
    })
    .prefix('/api/notifications')
    .middleware(middleware.auth())
}
