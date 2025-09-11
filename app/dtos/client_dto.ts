import Client from '#models/client'
import Rdv from '#models/rdv'

export class ClientDto {
  toJSON(client: Client) {
    return {
      id: client.id,
      name: client.name,
      firstname: client.firstname,
      ref: client.matricule,
      numBonCommande: client.numBonCommande || null,
      signAt: client.signAt || null,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      email: client.email || null,
      birthAt: client.birthAt || null,
      birthPlace: client.birthPlace || null,
      interested: client.interested,
      phoneFix: client.phoneFix || null,
      phonePortable: client.phonePortable || null,
      rs: client.rs,
      siren: client.siren || null,
      rpps: client.rpps || null,
      ville: client.ville || null,
      cp: client.codePostal || null,
      address: client.address || null,
      amount: client.amount || null,
      installAt: client.installAt || null,
      fsp: client.fsp || null,
      de: client.de || null,
      eSign: client.eSign,
      files: client.files ? client.files.map((file) => file.url) : [],
      financeur: client.financeur
        ? {
            id: client.financeur.id,
            name: client.financeur.libelle,
            article: client.financeur.article,
            amount: client.financeur.amount,
            address: client.financeur.address,
            cpInfo: client.financeur.cpInfo,
          }
        : null,
      rdvs: client.rdvs
        ? client.rdvs.map((rdv: Rdv) => {
            return {
              id: rdv.id,
              createdAt: rdv.createdAt,
              rdvAt: rdv.rdvAt,
              clientId: rdv.clientId,
              state: rdv.state,
              type: rdv.type,
              description: rdv.description,
              title: rdv.title,
              creneau: rdv.creneau,
              agent: {
                id: rdv.agent.id,
                name: rdv.agent.name,
                firstname: rdv.agent.firstname,
                cp: rdv.agent.codePostal || null,
                ville: rdv.agent.ville || null,
                address: rdv.agent.address || null,
                phone: rdv.agent.phone || null,
              },
            }
          })
        : [],
    }
  }
}
