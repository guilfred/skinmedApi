import { avatarCurrentUserValidator, updateProfileValidator } from '#validators/security_validators'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { attachmentManager } from '@jrmc/adonis-attachment'
import { UserDto } from '../../dtos/user_dto.js'

@inject()
export default class ProfileController {
  constructor(protected presenter: UserDto) {}

  async updateAvatar({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { avatar } = await request.validateUsing(avatarCurrentUserValidator)
    user.avatar = null
    await user.save()

    user.avatar = await attachmentManager.createFromFile(avatar)
    await user.save()

    return response.status(200).json(this.presenter.toJSON(user))
  }

  async removeAvatar({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    user.avatar = null
    await user.save()

    return response.status(200).json(this.presenter.toJSON(user))
  }

  async updateProfile({ auth, request, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.status(401).send('Requires authentication')
    }
    const { name, firstname, email, phone, description, cp, address, ville } =
      await request.validateUsing(updateProfileValidator)

    await user
      .merge({
        name,
        firstname,
        email,
        phone,
        description,
        address,
        ville,
        codePostal: cp ?? null,
      })
      .save()

    return response.status(200).json(this.presenter.toJSON(user))
  }
}
