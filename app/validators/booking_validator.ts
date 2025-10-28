import vine from '@vinejs/vine'

export const CreateBookingValidator = vine.compile(
  vine.object({
    start_time: vine.string(),
    end_time: vine.string(),
    at: vine.date({
      formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    }),
    agentId: vine.number().withoutDecimals().positive().optional(),
  })
)

export const CheckBookingIDValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().withoutDecimals().positive(),
    }),
  })
)

export const CheckAvailableDateValidator = vine.compile(
  vine.object({
    at: vine.date({
      formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    }),
    agentId: vine.number().withoutDecimals().positive().optional(),
  })
)

export const DetachBookingValidator = vine.compile(
  vine.object({
    start: vine.string(),
    end: vine.string(),
    new_start: vine.string(),
    new_end: vine.string(),
    at: vine.date({
      formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    }),
    agentId: vine.number().withoutDecimals().positive().optional(),
  })
)

export const DetachFromDropBookingValidator = vine.compile(
  vine.object({
    start: vine.string(),
    end: vine.string(),
    new_start: vine.string(),
    new_end: vine.string(),
    oldAt: vine.date({
      formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    }),
    newAt: vine.date({
      formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    }),
    agentId: vine.number().withoutDecimals().positive().optional(),
  })
)

export const UnlikeBookingValidator = vine.compile(
  vine.object({
    start: vine.string(),
    end: vine.string(),
    at: vine.date({
      formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    }),
    agentId: vine.number().withoutDecimals().positive().optional(),
  })
)
