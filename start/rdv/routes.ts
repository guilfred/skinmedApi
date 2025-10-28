import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const RdvClientController = () => import('#controllers/rdv_client_controller')
const RdvAgentController = () => import('#controllers/rdv_agent_controller')

export const RdvRoutes = () => {
  router
    .group(() => {
      router.post('/step_creates', [RdvClientController, 'createRdvFromClientAndAgentAttach'])
      router.get('', [RdvClientController, 'index'])
      router.get('/:id', [RdvClientController, 'viewRdvClient'])
      router.put('/rdvAt/:id', [RdvClientController, 'editRdvAgentDateRdv'])
      router.put('/crenau_agents/:id', [
        RdvClientController,
        'editRdvCreneauAndProfileAgentAndStateToClient',
      ])
    })
    .prefix('/api/rdvs/rdv_clients')
    .middleware(middleware.auth())

  router
    .group(() => {
      router.get('', [RdvAgentController, 'index'])
      router.get('/installations_list', [RdvAgentController, 'getListRdvInstallation'])
      router.post('', [RdvAgentController, 'createRdvInstallation'])
      router.put('/update_status/:id', [RdvAgentController, 'editRdvByAgent'])
      router.put('/rdv_at_creneau/:id', [RdvAgentController, 'editRdvAgentDateRdv'])
      router.put('/update_creneau/:id', [RdvAgentController, 'editRdvCreneau'])
      router.put('/update_installation/:id', [RdvAgentController, 'updateRdvInstallation'])
      router.get('/view_installation/:id', [RdvAgentController, 'viewRdvAgentInstallation'])
      router.put('/update_states/:id', [RdvAgentController, 'updateStateRdv'])
      router.get('/current_agent', [RdvAgentController, 'getRdvByCurrentAgent'])
      router.get('/by_agent/:agentID', [RdvAgentController, 'getRdvsByAgent'])
      router.get('/all_agents', [RdvAgentController, 'getRdvsAllAgent'])
    })
    .prefix('/api/rdvs/rdv_agents')
    .middleware(middleware.auth())
}
