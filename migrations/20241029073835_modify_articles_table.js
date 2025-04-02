/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('articles', (table) => {
    table.dropColumn('category_id');
    table.string('category', 255);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('articles', (table) => {
    table.dropColumn('category');
    table.bigInteger('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE').onUpdate('CASCADE');
  });
};
