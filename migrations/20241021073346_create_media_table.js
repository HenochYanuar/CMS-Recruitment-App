/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('media', (table) => {
    table.bigInteger('id').primary()
    table.string('file_name', 255)
    table.specificType('foto', 'bytea')
    table.string('file_url', 255)
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('media')
};
