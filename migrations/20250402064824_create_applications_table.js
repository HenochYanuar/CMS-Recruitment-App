/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('applications', (table) => {
    table.bigInteger('id').primary();
    table.bigInteger('job_id').unsigned().references('id').inTable('jobs').onDelete('CASCADE');
    table.bigInteger('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.enum('status', ['submitted', 'reviewed', 'interview', 'hired', 'rejected']).defaultTo('submitted');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('applications');
};