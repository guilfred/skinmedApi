import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AgentController = () => import('#controllers/agent_controller')

export const AgentRoutes = () => {
  router
    .group(() => {
      router.get('', [AgentController, 'index'])
      router.get('/:id', [AgentController, 'getAgent'])
    })
    .prefix('/api/agents')
    .middleware(middleware.auth())
}
