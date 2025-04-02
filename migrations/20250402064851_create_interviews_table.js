/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('interviews', (table) => {
    table.bigInteger('id').primary();
    table.bigInteger('application_id').unsigned().references('id').inTable('applications').onDelete('CASCADE');
    table.timestamp('interview_date').notNullable();
    table.string('location').notNullable();
    table.enum('status', ['scheduled', 'completed', 'canceled']).defaultTo('scheduled');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('interviews');
};