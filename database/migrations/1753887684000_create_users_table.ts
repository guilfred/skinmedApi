import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    const roles = [
      'ROLE_SUPER_ADMIN',
      'ROLE_TELE_ADMIN',
      'ROLE_ADMIN',
      'ROLE_USER',
      'ROLE_AGENT',
      'ROLE_TELE_VENDEUR',
    ]

    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.timestamp('last_login_at').nullable()
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.boolean('is_enabled').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.string('name')
      table.string('firstname')
      table.string('ville').nullable()
      table.string('address').nullable()
      table.string('code_postal').nullable()
      table.string('phone').nullable()
      table.text('description').nullable()
      table.json('avatar').nullable()
      table.enu('role', roles, {
        useNative: true,
        enumName: 'roles_type',
        existingType: false,
      })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP TYPE IF EXISTS "roles_type"')
  }
}
