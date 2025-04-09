/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.renameTable('userDetails', 'user_details')
};

exports.down = function(knex) {
  return knex.schema.renameTable('user_details', 'userDetails')
};
