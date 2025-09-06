import Rdv, { RdvType } from '#models/rdv'
import { ROLE } from '#models/user'

export class RdvRepository {
  public async getRdvsFromCurrentUser(currentUserID: number, type: RdvType) {
    return await Rdv.query()
      .where('type', type)
      .andWhere('isArchived', false)
      .whereHas('agent', (agentQuery) => {
        agentQuery.where('role', ROLE.AGENT)
      })
      .andWhereHas('user', (userQuery) => {
        userQuery.where('id', currentUserID)
      })
      .preload('client')
      .preload('user')
      .preload('agent')
  }

  public async getAllRdvsByAgent(type: RdvType) {
    return await Rdv.query()
      .where('type', type)
      .andWhere('isArchived', false)
      .whereHas('agent', (agentQuery) => {
        agentQuery.where('role', ROLE.AGENT)
      })
      .preload('client')
      .preload('user')
      .preload('agent')
  }

  public async getRdvsByCurrentAgent(type: RdvType, currentAgentID: number) {
    return await Rdv.query()
      .where('type', type)
      .andWhere('isArchived', false)
      .andWhere('agent_id', currentAgentID)
      .whereHas('agent', (agentQuery) => {
        agentQuery.where('role', ROLE.AGENT)
      })
      .preload('client')
      .preload('user')
      .preload('agent')
  }
}
