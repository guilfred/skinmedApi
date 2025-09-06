import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ClientController = () => import('#controllers/client_controller')

export const ClientRoutes = () => {
  router
    .group(() => {
      router.get('interested', [ClientController, 'getClientsInteresed'])
      router.get('not_interested', [ClientController, 'getClientsNotInteresed'])
      router.get('/:id', [ClientController, 'view'])
      router.put('/edit_contract/:id', [ClientController, 'editContract'])
      router.put('/edit_information/:id', [ClientController, 'editClientInformation'])
      router.post('', [ClientController, 'store'])
      router.put('/scan_files/:id', [ClientController, 'scanFiles'])
    })
    .prefix('/api/clients')
    .middleware(middleware.auth())
}
