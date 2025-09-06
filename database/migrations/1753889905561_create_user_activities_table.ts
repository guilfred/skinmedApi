import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_activities'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.string('action', 255).notNullable()
      table.text('description').notNullable()
      table.string('ip_address', 45).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
