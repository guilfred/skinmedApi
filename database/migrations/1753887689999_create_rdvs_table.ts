import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rdvs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at')
      table.timestamp('rdv_at').notNullable()
      table.boolean('state').notNullable()
      table.boolean('is_archived').notNullable()
      table.text('description').nullable()
      table.string('creneau').nullable()
      table.enu('type', ['contact', 'installation'], {
        useNative: true,
        enumName: 'rdvs_type',
        existingType: false,
      })
      table.string('title').notNullable()
      table.integer('agent_id').notNullable().unsigned().references('users.id').onDelete('CASCADE')
      table
        .integer('client_id')
        .notNullable()
        .unsigned()
        .references('clients.id')
        .onDelete('CASCADE')
      table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP TYPE IF EXISTS "rdv_type"')
  }
}
