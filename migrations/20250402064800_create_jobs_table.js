/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('jobs', (table) => {
    table.bigInteger('id').primary();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.integer('salary_min');
    table.integer('salary_max');
    table.enum('type', ['Full-time', 'Part-time', 'Freelance', 'Internship']).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('jobs');
};
