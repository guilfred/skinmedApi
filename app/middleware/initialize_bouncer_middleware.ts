import * as abilities from '#abilities/main'
import { policies } from '#policies/main'

import { Bouncer } from '@adonisjs/bouncer'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Init bouncer middleware is used to create a bouncer instance
 * during an HTTP request
 */

// Si AdonisJS a déjà défini le type correct
export default class InitializeBouncerMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    ctx.bouncer = new Bouncer(
      () => ctx.auth.user || null,
      abilities,
      policies
    ).setContainerResolver(ctx.containerResolver)

    // ✅ Vérification safe avec assertion
    if ('view' in ctx && ctx.view) {
      ;(ctx.view as { share: (helpers: any) => void }).share(ctx.bouncer.edgeHelpers)
    }

    return next()
  }
}

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    bouncer: Bouncer<
      Exclude<HttpContext['auth']['user'], undefined>,
      typeof abilities,
      typeof policies
    >
  }
}
