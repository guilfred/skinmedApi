import { CreateClientEvent } from '#events/user_activity_event'
import ActivityService from '#services/activity_service'
import { inject } from '@adonisjs/core'
import { Logger } from '@adonisjs/core/logger'

@inject()
export default class ClientListener {
  constructor(
    protected logger: Logger,
    protected activity: ActivityService
  ) {}

  async onClientCreated({ ctx, client }: CreateClientEvent) {
    const user = ctx.auth.user
    if (!user) return

    const description = `Création d'un client effectué le ${client.createdAt}`

    await this.activity.createActivity(user.id, 'client.create', description, ctx.request.ip())
    this.logger.info(
      { user: user },
      `Ajout d'un client par l'utilisateur ${user.name} ${user.firstname} le ${client.createdAt}`
    )
  }
}
