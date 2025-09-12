import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const BookingController = () => import('#controllers/booking_controller')

export const TimeSlotRoutes = () => {
  router
    .group(() => {
      router.get('', [BookingController, 'getAvailableBooking'])
      router.post('', [BookingController, 'store'])
      router.post('detach', [BookingController, 'detach'])
      router.post('detach_from', [BookingController, 'detachFromDrop'])
      router.post('unlike', [BookingController, 'unlike'])
    })
    .prefix('/api/time_slots')
    .middleware(middleware.auth())
}
