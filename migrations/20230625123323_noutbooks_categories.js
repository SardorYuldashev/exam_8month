/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('noutbooks_categories', (table) => {
    table.increments('id').primary();
    table.integer('noutbook_id').references('id').inTable('noutbooks');
    table.integer('category_id').references('id').inTable('categories');
    table.unique(['noutbook_id', 'category_id']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('noutbooks_categories');
};
