import vine from '@vinejs/vine'

export const CreateRdvAgentValidator = vine.compile(
  vine.object({
    rdvAt: vine.date({
      formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    }),
    agentId: vine.number().withoutDecimals().positive(),
    clientId: vine.number().withoutDecimals().positive(),
    title: vine.string().trim(),
    description: vine.string().trim().nullable().optional(),
    time: vine.date({
      formats: ['HH:mm'],
    }),
  })
)

export const CheckRdvIDValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().withoutDecimals().positive(),
    }),
  })
)

export const SetCreneauValidator = vine.compile(
  vine.object({
    creneau: vine.string().trim(),
  })
)

export const CreateRdvClientValidator = vine.compile(
  vine.object({
    rdvAt: vine.date({
      formats: ['YYYY/DD/MM', 'DD/MM/YYYY'],
    }),
    clientId: vine.number().withoutDecimals().positive(),
    title: vine.string().trim(),
    description: vine.string().trim().nullable().optional(),
  })
)

export const UpdateRdvAtValidator = vine.compile(
  vine.object({
    rdvAt: vine.date({
      formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    }),
    creneau: vine.string().trim(),
  })
)

export const UpdateCrenauAndProfileAgentValidator = vine.compile(
  vine.object({
    creneau: vine.string().trim(),
    agentId: vine.number().withoutDecimals().positive(),
    isArchived: vine.boolean(),
    at: vine.date({
      formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    }),
  })
)

export const GetAgentByTypeValidator = vine.compile(
  vine.object({
    type: vine.enum(['contact', 'installation']),
    userID: vine.number().withoutDecimals().positive().optional(),
  })
)

export const createRdvFromClientAgentAttachValidator = vine.compile(
  vine.object({
    client: vine.object({
      name: vine.string().trim(),
      firstname: vine.string().trim(),
      rs: vine.string().trim(),
      email: vine.string().email().trim().nullable(),
      address: vine.string().trim().nullable(),
      cp: vine.string().trim().fixedLength(5).regex(/^\d+$/).nullable(),
      department: vine.string().trim().fixedLength(2).regex(/^\d+$/),
      ville: vine.string().trim().nullable(),
      phoneFix: vine.string().trim().nullable(),
      phonePortable: vine.string().trim().nullable(),
      interested: vine.boolean(),
    }),
    rdv: vine.object({
      at: vine.date({
        formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
      }),
      title: vine.string().trim(),
      description: vine.string().trim().nullable(),
      creneau: vine.string().trim(),
    }),
    agentId: vine.number().withoutDecimals().positive(),
  })
)

export const validateRdvInstallationValidator = vine.compile(
  vine.object({
    signAt: vine.date({
      formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    }),
    financeurId: vine.number().withoutDecimals().positive(),
  })
)
