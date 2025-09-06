import { CreateClientEvent, RdvCreatedEvent } from '#events/user_activity_event'
import emitter from '@adonisjs/core/services/emitter'

const RdvListener = () => import('#listeners/rdv_listener')
const ClientListener = () => import('#listeners/client_listener')

emitter.on(RdvCreatedEvent, [RdvListener, 'handle'])
emitter.on(CreateClientEvent, [ClientListener, 'onClientCreated'])
