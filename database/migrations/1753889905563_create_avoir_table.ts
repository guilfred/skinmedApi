import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'avoirs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('at')
      table.integer('qte_billed').notNullable()
      table.decimal('tva').notNullable()
      table.string('libelle').notNullable()
      table.integer('client_id').unsigned().references('clients.id').onDelete('CASCADE')
      table.decimal('unit_price').notNullable()
      table.decimal('total').notNullable()
      table.integer('qte_realized').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
