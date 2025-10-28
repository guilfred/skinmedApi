export const NOT_ACCESS_RESOURCE = "Vous n'avez pas le d'accéder à cette ressource !"

export function formatCp(num: string) {
  const numeric = Number(num)

  return numeric.toString().padStart(num.length, '0')
}

export const formatTimeSlot = (time: string): string => {
  if (time.toString().length === 1) {
    return time.toString().padStart(2, '0')
  }
  return time.toString()
}

export function getMonthName(monthNumber: number, locale = 'fr-FR'): string {
  const date = new Date(2000, monthNumber - 1, 1)

  return date.toLocaleString(locale, { month: 'long' })
}

export const formatLibelle = (libelle: string, date: Date) => {
  const monthName = date.toLocaleDateString('fr-FR', { month: 'long' })

  return `${libelle} ${monthName} ${date.getFullYear()}`
}

export const getTotalAvoir = (qte: number): number => {
  const mask = 10
  if (qte > 22) {
    return 22 * mask
  }

  return qte * mask
}
