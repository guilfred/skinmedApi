import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const FinanceurController = () => import('#controllers/financeur_controller')

export const FinanceurRoutes = () => {
  router
    .group(() => {
      router.get('', [FinanceurController, 'index'])
      router.post('', [FinanceurController, 'store'])
      router.put('/:id', [FinanceurController, 'edit'])
      router.get('/:id', [FinanceurController, 'view'])
    })
    .prefix('/api/financeurs')
    .middleware(middleware.auth())
}
