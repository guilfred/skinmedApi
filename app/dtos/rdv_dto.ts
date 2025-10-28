import Avoir from '#models/avoir'
import Rdv from '#models/rdv'

export class RdvDto {
  toJSON(rdv: Rdv) {
    return {
      id: rdv.id,
      createdAt: rdv.createdAt,
      rdvAt: rdv.rdvAt.toFormat('yyyy-MM-dd'),
      start: rdv.start,
      end: rdv.end,
      client: {
        id: rdv.client.id,
        name: rdv.client.name,
        firstname: rdv.client.firstname,
        email: rdv.client.email,
        signed: rdv.client.signEd,
        rs: rdv.client.rs,
        ville: rdv.client.ville,
        phoneFix: rdv.client.phoneFix,
        phonePortable: rdv.client.phonePortable,
        cp: rdv.client.codePostal,
        address: rdv.client.address,
        ref: rdv.client.matricule,
      },
      state: rdv.state,
      type: rdv.type,
      description: rdv.description || null,
      title: rdv.title,
      user: {
        id: rdv.user.id,
        name: rdv.user.name,
        firstname: rdv.user.firstname,
      },
      agendId: rdv.agentId,
      agent: {
        id: rdv.agent.id,
        name: rdv.agent.name,
        firstname: rdv.agent.firstname,
        cp: rdv.agent.codePostal || null,
        ville: rdv.agent.ville || null,
        address: rdv.agent.address || null,
        phone: rdv.agent.phone || null,
      },
      isArchived: rdv.isArchived,
      avoirs: rdv.avoirs
        ? rdv.avoirs.map((avoir: Avoir) => {
            return {
              id: avoir.id,
              qteBilled: avoir.qteBilled,
              qteRealized: avoir.qteRealized,
              createdAt: avoir.createdAt,
              at: avoir.at,
              rdvId: avoir.rdvId,
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
                : [],
            }
          })
        : null,
    }
  }
}
