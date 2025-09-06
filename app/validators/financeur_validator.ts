import vine from '@vinejs/vine'

export const UpdateFinanceurValidator = vine.compile(
  vine.object({
    libelle: vine.string().trim(),
    address: vine.string().trim(),
    amount: vine.number(),
    cpInfo: vine.string().trim(),
    article: vine.string().trim(),
  })
)

export const CheckFinanceurIDValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().withoutDecimals().positive(),
    }),
  })
)
