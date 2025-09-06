/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { AgentRoutes } from './agent/routes.js'
import { AvoirRoutes } from './avoir/routes.js'
import { ClientRoutes } from './client/routes.js'
import { FinanceurRoutes } from './financeur/routes.js'
import { RdvRoutes } from './rdv/routes.js'
import { SecurityRoutes } from './security/routes.js'
import { TimeSlotRoutes } from './time_slot/routes.js'

FinanceurRoutes()
RdvRoutes()
ClientRoutes()
SecurityRoutes()
AgentRoutes()
TimeSlotRoutes()
AvoirRoutes()
