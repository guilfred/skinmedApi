import vine from '@vinejs/vine'

export const getClientIDFromAvoirValidator = vine.compile(
  vine.object({
    params: vine.object({
      clientId: vine.number().withoutDecimals().positive(),
      avoirId: vine.number().withoutDecimals().positive(),
    }),
  })
)

export const getAvoirIDValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().withoutDecimals().positive(),
    }),
  })
)

export const createAvoirValidator = vine.compile(
  vine.object({
    qte: vine.number().withoutDecimals().positive(),
    clientId: vine.number().withoutDecimals().positive(),
    rdvId: vine.number().withoutDecimals().positive(),
    tva: vine.number().positive(),
    libelle: vine.string().trim(),
    at: vine.date({
      formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    }),
    unit_price: vine.number().positive(),
  })
)

export const updateAvoirValidator = vine.compile(
  vine.object({
    qte: vine.number().withoutDecimals().positive(),
    tva: vine.number().positive(),
    libelle: vine.string().trim(),
    at: vine.date({
      formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    }),
    unit_price: vine.number().positive(),
  })
)
