import Rdv from '#models/rdv'

export class RdvDto {
  toJSON(rdv: Rdv) {
    return {
      id: rdv.id,
      createdAt: rdv.createdAt,
      rdvAt: rdv.rdvAt.toFormat('yyyy-MM-dd'),
      creneau: rdv.creneau,
      client: {
        id: rdv.client.id,
        name: rdv.client.name,
        firstname: rdv.client.firstname,
        email: rdv.client.email,
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
    }
  }
}
