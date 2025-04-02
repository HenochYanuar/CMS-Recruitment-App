/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.bigInteger('id').primary()
    table.string('username', 255).notNullable()
    table.string('email').unique().notNullable()
    table.string('name', 255)
    table.enum('role', ['admin', 'user']).defaultTo('user')
    table.specificType('password', 'char(60)').notNullable()
    table.boolean('isRegister').notNullable().defaultTo(false)
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
