import User, { ROLE } from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class AccountPolicy extends BasePolicy {
  create(user: User): AuthorizerResponse {
    return user.role === ROLE.SUPER_ADMIN
  }

  listeFromAdmin(user: User, role: ROLE): AuthorizerResponse {
    return user.canAccess(role)
  }
}
