import vine from '@vinejs/vine'

export const createRdvInstallationValidator = vine.compile(
  vine.object({
    at: vine.date({
      formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    }),
    description: vine.string().trim().nullable(),
    start: vine.string().trim(),
    end: vine.string().trim(),
    clientId: vine.number().withoutDecimals().positive(),
  })
)

export const UpdateCreneauValidator = vine.compile(
  vine.object({
    start: vine.string().trim(),
    end: vine.string().trim(),
    agentId: vine.number().withoutDecimals().positive(),
    isArchived: vine.boolean(),
  })
)

export const UpdateCrenauAndStateAgentValidator = vine.compile(
  vine.object({
    state: vine.boolean(),
    isArchived: vine.boolean(),
  })
)
