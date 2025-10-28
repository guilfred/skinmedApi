import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const ClientController = () => import('#controllers/client_controller')

export const ClientRoutes = () => {
  router
    .group(() => {
      router.get('', [ClientController, 'getClients'])
      router.get('/:id', [ClientController, 'view'])
      router.put('/edit_contract/:id', [ClientController, 'editContract'])
      router.put('/edit_information/:id', [ClientController, 'editClientInformation'])
      router.post('', [ClientController, 'store'])
      router.put('/scan_files/:id', [ClientController, 'scanFiles'])
      router.put('/choice_leaseurs/:id', [ClientController, 'choiceLeaseur'])
      router.put('/update_contract_signed/:id', [ClientController, 'setContratSigned'])
    })
    .prefix('/api/clients')
    .middleware(middleware.auth())
}
