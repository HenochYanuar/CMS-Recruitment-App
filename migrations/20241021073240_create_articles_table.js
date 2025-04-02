/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('articles', (table) => {
    table.bigInteger('id').primary()
    table.string('title', 255).notNullable()
    table.string('content').notNullable()
    table.string('image_url', 255)
    table.bigInteger('category_id').unsigned().references('id').inTable('categories').onDelete('CASCADE').onUpdate('CASCADE');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('articles')
};
