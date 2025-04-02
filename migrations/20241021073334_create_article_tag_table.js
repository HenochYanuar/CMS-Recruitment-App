/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('article_tag', (table) => {
    table.bigInteger('id').primary()
    table.bigInteger('article_id').unsigned().references('id').inTable('articles').onDelete('CASCADE').onUpdate('CASCADE');
    table.bigInteger('tag_id').unsigned().references('id').inTable('tags').onDelete('CASCADE').onUpdate('CASCADE');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('article_tag')
};
