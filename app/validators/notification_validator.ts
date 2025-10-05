import vine from '@vinejs/vine'

export const NotificationUserIDValidator = vine.compile(
  vine.object({
    params: vine.object({
      userId: vine.number().withoutDecimals().positive(),
    }),
  })
)

export const NotificationIDValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().withoutDecimals().positive(),
    }),
  })
)
