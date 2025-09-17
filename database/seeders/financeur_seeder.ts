import Financeur from '#models/financeur'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class FinanceurSeeder extends BaseSeeder {
  async run() {
    await Financeur.createMany([
      {
        libelle: 'SAS LUO HEALTHCARE',
        address: '200 COURS LEON GAMBETTA',
        cpInfo: '84300 CAVAILLON',
        article: 'ART00000011 -Pack Dermo+ Pharmacie',
        amount: 9300.0,
      },
      {
        libelle: 'SAS Grenke Location',
        address: '9 - 9A, 9 RUE DE LISBONNE',
        cpInfo: '67300 SCHILTIGHEIM',
        article: 'ART00000010 -Pack Dermo+ Pharmacie',
        amount: 8177.88,
      },
    ])
  }
}
