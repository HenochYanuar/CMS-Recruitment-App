/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('articles', (table) => {
    table.bigInteger('tags_id').unsigned().references('id').inTable('tags').onDelete('CASCADE').onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('articles', (table) => {
    table.dropColumn('tags_id');
  });
};
