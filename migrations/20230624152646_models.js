/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('models', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable().unique();
    table.integer('brand_id').references('id').inTable('brands').onDelete('SET NULL');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('models');
};
