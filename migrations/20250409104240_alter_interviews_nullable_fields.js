/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('interviews', (table) => {
    table.timestamp('interview_date').nullable().alter();
    table.string('location').nullable().alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable('interviews', (table) => {
    table.timestamp('interview_date').notNullable().alter();
    table.string('location').notNullable().alter();
  });
};
