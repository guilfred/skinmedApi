import User from '#models/user'

export class UserDto {
  toJSON(user: User) {
    return {
      id: user.id,
      avatar: user.avatar ? user.avatar.url : null,
      email: user.email,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt,
      isEnabled: user.isEnabled,
      role: user.role,
      name: user.name,
      firstname: user.firstname,
      phone: user.phone || '',
      ville: user.ville || '',
      codePostal: user.codePostal || '',
      address: user.address || '',
      description: user.description || '',
    }
  }
}
