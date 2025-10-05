import { NotificationCreatedEvent } from '#events/notification_event'
import { CreateClientEvent, RdvCreatedEvent } from '#events/user_activity_event'
import NotificationListener from '#listeners/notification_listener'
import emitter from '@adonisjs/core/services/emitter'

const RdvListener = () => import('#listeners/rdv_listener')
const ClientListener = () => import('#listeners/client_listener')

emitter.on(RdvCreatedEvent, [RdvListener, 'handle'])
emitter.on(CreateClientEvent, [ClientListener, 'onClientCreated'])
emitter.on(NotificationCreatedEvent, [NotificationListener, 'onNotificationCreated'])
