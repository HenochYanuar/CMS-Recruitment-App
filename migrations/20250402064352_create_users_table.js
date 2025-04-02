/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.bigInteger('id').primary();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.enum('role', ['jobseeker', 'admin_hr']).defaultTo('jobseeker');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};

