import vine from '@vinejs/vine'

export const CheckClientIDValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number().withoutDecimals().positive(),
    }),
  })
)

export const UpdateContratSignedValidator = vine.compile(
  vine.object({
    signed: vine.boolean(),
  })
)

export const EditClientContratDataValidator = vine.compile(
  vine.object({
    siren: vine.string().trim().nullable(),
    rpps: vine.string().trim().nullable(),
    de: vine.string().trim().nullable(),
    fsp: vine.string().trim().nullable(),
    amount: vine.number().positive().nullable(),
    numBonCommande: vine.string().trim().nullable(),
    matricule: vine.string().trim().nullable(),
    signAt: vine
      .date({
        formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
      })
      .nullable(),
    installAt: vine
      .date({
        formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
      })
      .nullable(),
    eSign: vine.boolean().optional(),
    financeurId: vine.number().withoutDecimals().positive().nullable(),
  })
)

export const EditPreClientValidator = vine.compile(
  vine.object({
    nom: vine.string().trim(),
    firstname: vine.string().trim(),
    rs: vine.string().trim(),
    ville: vine.string().trim().nullable(),
    address: vine.string().trim().nullable(),
    email: vine.string().trim().nullable(),
    phoneFix: vine.string().trim().nullable(),
    phonePortable: vine.string().trim().nullable(),
    birthAt: vine
      .date({
        formats: ['DD-MM-YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'],
      })
      .nullable(),
    birthPlace: vine.string().trim().nullable(),
    codePostal: vine.string().trim().fixedLength(5).regex(/^\d+$/).nullable().optional(),
    department: vine.string().trim().fixedLength(2).regex(/^\d+$/),
  })
)

export const AddClientValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    firstname: vine.string().trim(),
    rs: vine.string().trim(),
    ville: vine.string().trim().nullable(),
    address: vine.string().trim().nullable(),
    email: vine.string().trim().nullable(),
    phoneFix: vine.string().trim().nullable(),
    phonePortable: vine.string().trim().nullable(),
    codePostal: vine.string().trim().fixedLength(5).regex(/^\d+$/).nullable().optional(),
    department: vine.string().trim().fixedLength(2).regex(/^\d+$/),
    interested: vine.boolean(),
  })
)

export const scanFilesClientValidator = vine.compile(
  vine.object({
    files: vine
      .array(
        vine.file({
          size: '10mb', // Limite de taille optionnelle
          extnames: ['png', 'jpg', 'jpeg', 'pdf', 'docx', 'txt'], // Corrigé 'docs' -> 'doc', 'docx'
        })
      )
      .minLength(1), // Au moins 1 fichier requis
  })
)

export const choiceLeaseurValidator = vine.compile(
  vine.object({
    financeurId: vine.number().withoutDecimals().positive(),
    esign: vine.boolean(),
  })
)
