/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('comments', (table) => {
    table.bigInteger('id').primary()
    table.string('content', 255).notNullable()
    table.bigInteger('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE');
    table.bigInteger('article_id').unsigned().references('id').inTable('articles').onDelete('CASCADE').onUpdate('CASCADE');
    table.bigInteger('parent_id').unsigned().references('id').inTable('comments').onDelete('CASCADE').onUpdate('CASCADE');
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('comments')
};
