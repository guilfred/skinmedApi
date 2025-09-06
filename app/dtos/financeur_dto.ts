import Client from '#models/client'
import Financeur from '#models/financeur'

export class FinanceurDto {
  toJSON(f: Financeur) {
    return {
      id: f.id,
      libelle: f.libelle,
      article: f.article,
      amount: f.amount,
      address: f.address,
      cpInfo: f.cpInfo,
      clients: f.clients
        ? f.clients.map((c: Client) => {
            return {
              id: c.id,
              createdAt: c.createdAt,
              name: c.name,
              firstname: c.firstname,
              rs: c.rs,
              signAt: c.signAt,
              ref: c.matricule,
            }
          })
        : [],
    }
  }
}
