import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('num_bon_commande').nullable()
      table.string('matricule').nullable()
      table.string('department', 2)
      table.string('de').nullable()
      table.string('fsp').nullable()
      table.string('name').notNullable()
      table.string('firstname').notNullable()
      table.string('rs').notNullable()
      table.string('siren').nullable()
      table.string('rpps').nullable()
      table.string('ville').nullable()
      table.string('address').nullable()
      table.string('code_postal').nullable()
      table.string('email').nullable()
      table.string('phone_fix').nullable()
      table.string('phone_portable').nullable()
      table.decimal('amount').nullable()
      table.timestamp('sign_at').nullable()
      table.timestamp('install_at').nullable()
      table.timestamp('birth_at').nullable()
      table.string('birth_place').nullable()
      table.boolean('e_sign').nullable()
      table.boolean('sign_ed')
      table.boolean('interested').notNullable()
      table.json('files').nullable()
      table.integer('financeur_id').nullable().unsigned().references('financeurs.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
