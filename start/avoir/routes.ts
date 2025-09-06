import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AvoirController = () => import('#controllers/avoir_controller')

export const AvoirRoutes = () => {
  router
    .group(() => {
      router.get('/by_client/:clientId', [AvoirController, 'getAvoirsByClient'])
      router.post('', [AvoirController, 'store'])
      router.delete('/:id', [AvoirController, 'destroy'])
      router.put('/:id', [AvoirController, 'edit'])
      router.get('/:id', [AvoirController, 'view'])
    })
    .prefix('/api/avoirs')
    .middleware(middleware.auth())
}
