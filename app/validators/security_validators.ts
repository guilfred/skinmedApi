import { ROLE } from '#models/user'
import vine from '@vinejs/vine'

export const createAccountValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8).maxLength(32),
    role: vine.enum(ROLE),
    name: vine.string().trim(),
    firstname: vine.string().trim(),
  })
)

export const AuthenticationValidator = vine.compile(
  vine.object({
    username: vine.string().email().trim(),
    password: vine.string().trim(),
  })
)

export const getCurrentUserIDValidator = vine.compile(
  vine.object({
    userID: vine.number().withoutDecimals().positive(),
  })
)

export const updateStateValidator = vine.compile(
  vine.object({
    state: vine.boolean(),
  })
)

export const avatarCurrentUserValidator = vine.compile(
  vine.object({
    avatar: vine.file({
      size: '2mb',
      extnames: ['png', 'jpg', 'jpeg'],
    }),
  })
)

export const updateProfileValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    firstname: vine.string().trim(),
    email: vine.string().email(),
    phone: vine.string().trim().nullable(),
    description: vine.string().trim().nullable(),
    ville: vine.string().trim().nullable(),
    address: vine.string().trim().nullable(),
    cp: vine.string().trim().fixedLength(5).regex(/^\d+$/).nullable(),
  })
)
