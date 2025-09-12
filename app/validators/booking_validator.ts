import vine from '@vinejs/vine'

export const CreateBookingValidator = vine.compile(
  vine.object({
    start_time: vine.number().withoutDecimals().positive(),
    end_time: vine.number().withoutDecimals().positive(),
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
    start: vine.number().withoutDecimals().positive(),
    end: vine.number().withoutDecimals().positive(),
    new_start: vine.number().withoutDecimals().positive(),
    new_end: vine.number().withoutDecimals().positive(),
    at: vine.date({
      formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    }),
    agentId: vine.number().withoutDecimals().positive().optional(),
  })
)

export const DetachFromDropBookingValidator = vine.compile(
  vine.object({
    start: vine.number().withoutDecimals().positive(),
    end: vine.number().withoutDecimals().positive(),
    new_start: vine.number().withoutDecimals().positive(),
    new_end: vine.number().withoutDecimals().positive(),
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
    start: vine.number().withoutDecimals().positive(),
    end: vine.number().withoutDecimals().positive(),
    at: vine.date({
      formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
    }),
    agentId: vine.number().withoutDecimals().positive().optional(),
  })
)
