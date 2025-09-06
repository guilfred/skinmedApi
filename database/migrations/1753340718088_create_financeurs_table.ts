import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'financeurs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('libelle').notNullable()
      table.string('address').notNullable()
      table.string('cp_info').notNullable()
      table.string('article').notNullable()
      table.decimal('amount').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
