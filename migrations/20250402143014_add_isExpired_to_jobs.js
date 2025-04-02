/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('jobs', function (table) {
    table.boolean('isExpired').notNullable().defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable('jobs', function (table) {
    table.dropColumn('isExpired');
  });
};