import vine from '@vinejs/vine'

export const CheckAgentIDValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().withoutDecimals().positive(),
    }),
  })
)
