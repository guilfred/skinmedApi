import Avoir from '#models/avoir'

export class AvoirDto {
  toJSON(avoir: Avoir) {
    return {
      id: avoir.id,
      qteBilled: avoir.qteBilled,
      qteRealized: avoir.qteRealized,
      createdAt: avoir.createdAt,
      at: avoir.at,
      tva: avoir.tva,
      libelle: avoir.libelle,
      total: avoir.total,
      unitPrice: avoir.unitPrice,
      client: avoir.client
        ? {
            id: avoir.client.id,
            fullname: `${avoir.client.firstname} ${avoir.client.name}`,
            rs: avoir.client.rs,
            ref: avoir.client.matricule,
          }
        : null,
    }
  }
}
