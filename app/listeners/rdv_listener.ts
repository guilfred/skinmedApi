import { RdvCreatedEvent } from '#events/user_activity_event'
import ActivityService from '#services/activity_service'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'

@inject()
export default class RdvListener {
  constructor(
    protected logger: Logger,
    protected activity: ActivityService
  ) {}

  /**
   * Création de RDV
   */
  async handle({ ctx, rdv }: RdvCreatedEvent) {
    if (!ctx.auth.user) return

    const description = `Création d'un RDV pour le ${rdv.rdvAt} avec l'agent #${rdv.agentId}`

    await this.activity.createActivity(
      ctx.auth.user.id,
      'rdv.create',
      description,
      ctx.request.ip()
    )
  }
}
